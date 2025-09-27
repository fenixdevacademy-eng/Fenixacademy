"""
API endpoints for exercises and quizzes from expanded content
"""
import os
import json
import re
from pathlib import Path
from django.http import JsonResponse
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.cache import cache
from django.utils import timezone

# Base path for expanded content
EXPANDED_CONTENT_PATH = os.path.join(settings.BASE_DIR, 'fenix-expanded-content')

class ExercisesQuizzesAPI(APIView):
    """API for managing exercises and quizzes from expanded content"""
    permission_classes = [AllowAny]
    
    def extract_exercises_from_content(self, content):
        """Extract exercises from markdown content"""
        exercises = []
        
        if not content:
            return exercises
        
        # Extract exercise sections
        exercise_patterns = [
            r'^###\s+Exercícios Práticos\s*\n(.+?)(?=^###|\Z)',
            r'^##\s+Exercícios Práticos\s*\n(.+?)(?=^##|\Z)',
            r'^###\s+Desafios\s*\n(.+?)(?=^###|\Z)',
            r'^###\s+Atividades\s*\n(.+?)(?=^###|\Z)'
        ]
        
        for pattern in exercise_patterns:
            matches = re.findall(pattern, content, re.MULTILINE | re.DOTALL)
            for match in matches:
                # Extract individual exercises
                exercise_items = re.findall(r'^\d+\.\s*\*\*(.+?)\*\*:\s*(.+?)(?=^\d+\.|$)', match, re.MULTILINE | re.DOTALL)
                for title, description in exercise_items:
                    exercises.append({
                        'title': title.strip(),
                        'description': description.strip(),
                        'type': 'practical'
                    })
        
        return exercises
    
    def extract_quizzes_from_content(self, content):
        """Extract quiz questions from markdown content"""
        quizzes = []
        
        if not content:
            return quizzes
        
        # Extract quiz sections
        quiz_patterns = [
            r'^###\s+Quiz\s*\n(.+?)(?=^###|\Z)',
            r'^##\s+Quiz\s*\n(.+?)(?=^##|\Z)',
            r'^###\s+Teste\s*\n(.+?)(?=^###|\Z)',
            r'^###\s+Avaliação\s*\n(.+?)(?=^###|\Z)'
        ]
        
        for pattern in quiz_patterns:
            matches = re.findall(pattern, content, re.MULTILINE | re.DOTALL)
            for match in matches:
                # Extract multiple choice questions
                mc_questions = re.findall(r'^\d+\.\s*(.+?)\n\s*a\)\s*(.+?)\n\s*b\)\s*(.+?)\n\s*c\)\s*(.+?)\n\s*d\)\s*(.+?)(?:\n\s*Resposta:\s*(.+?))?(?=^\d+\.|$)', match, re.MULTILINE | re.DOTALL)
                
                for question, a, b, c, d, answer in mc_questions:
                    quizzes.append({
                        'question': question.strip(),
                        'options': [
                            {'letter': 'a', 'text': a.strip()},
                            {'letter': 'b', 'text': b.strip()},
                            {'letter': 'c', 'text': c.strip()},
                            {'letter': 'd', 'text': d.strip()}
                        ],
                        'correct_answer': answer.strip() if answer else None,
                        'type': 'multiple_choice'
                    })
                
                # Extract true/false questions
                tf_questions = re.findall(r'^\d+\.\s*(.+?)\n\s*Verdadeiro\s*/\s*Falso\s*(?:\n\s*Resposta:\s*(.+?))?(?=^\d+\.|$)', match, re.MULTILINE | re.DOTALL)
                
                for question, answer in tf_questions:
                    quizzes.append({
                        'question': question.strip(),
                        'type': 'true_false',
                        'correct_answer': answer.strip() if answer else None
                    })
        
        return quizzes
    
    def extract_code_exercises(self, content):
        """Extract coding exercises from content"""
        code_exercises = []
        
        if not content:
            return code_exercises
        
        # Extract code blocks with exercises
        code_pattern = r'```(\w+)?\n(.*?)\n```'
        code_blocks = re.findall(code_pattern, content, re.DOTALL)
        
        # Look for exercise context around code blocks
        exercise_context_pattern = r'^###\s+(.+?)\s*\n.*?```(\w+)?\n(.*?)\n```'
        exercise_matches = re.findall(exercise_context_pattern, content, re.MULTILINE | re.DOTALL)
        
        for title, language, code in exercise_matches:
            if 'exercício' in title.lower() or 'desafio' in title.lower() or 'atividade' in title.lower():
                code_exercises.append({
                    'title': title.strip(),
                    'language': language or 'text',
                    'code': code.strip(),
                    'type': 'coding'
                })
        
        return code_exercises
    
    def get_course_exercises(self, course_slug, level=None):
        """Get all exercises for a course"""
        course_path = os.path.join(EXPANDED_CONTENT_PATH, course_slug)
        exercises = []
        
        if not os.path.exists(course_path):
            return exercises
        
        # Get levels to search
        levels = [level] if level else ['iniciante', 'intermediario', 'avancado']
        
        for level_dir in levels:
            level_path = os.path.join(course_path, level_dir)
            if not os.path.exists(level_path):
                continue
            
            # Get all markdown files in this level
            for file in os.listdir(level_path):
                if file.endswith('.md') and not file.endswith('.old'):
                    file_path = os.path.join(level_path, file)
                    
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            content = f.read()
                        
                        # Extract exercises
                        practical_exercises = self.extract_exercises_from_content(content)
                        code_exercises = self.extract_code_exercises(content)
                        
                        for exercise in practical_exercises:
                            exercise.update({
                                'id': f"{course_slug}-{level_dir}-{file}-{len(exercises)}",
                                'course_slug': course_slug,
                                'level': level_dir,
                                'file': file,
                                'difficulty': level_dir
                            })
                            exercises.append(exercise)
                        
                        for exercise in code_exercises:
                            exercise.update({
                                'id': f"{course_slug}-{level_dir}-{file}-code-{len(exercises)}",
                                'course_slug': course_slug,
                                'level': level_dir,
                                'file': file,
                                'difficulty': level_dir
                            })
                            exercises.append(exercise)
                    
                    except Exception as e:
                        continue
        
        return exercises
    
    def get_course_quizzes(self, course_slug, level=None):
        """Get all quizzes for a course"""
        course_path = os.path.join(EXPANDED_CONTENT_PATH, course_slug)
        quizzes = []
        
        if not os.path.exists(course_path):
            return quizzes
        
        # Get levels to search
        levels = [level] if level else ['iniciante', 'intermediario', 'avancado']
        
        for level_dir in levels:
            level_path = os.path.join(course_path, level_dir)
            if not os.path.exists(level_path):
                continue
            
            # Get all markdown files in this level
            for file in os.listdir(level_path):
                if file.endswith('.md') and not file.endswith('.old'):
                    file_path = os.path.join(level_path, file)
                    
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            content = f.read()
                        
                        # Extract quizzes
                        quiz_questions = self.extract_quizzes_from_content(content)
                        
                        for i, quiz in enumerate(quiz_questions):
                            quiz.update({
                                'id': f"{course_slug}-{level_dir}-{file}-quiz-{i}",
                                'course_slug': course_slug,
                                'level': level_dir,
                                'file': file,
                                'difficulty': level_dir
                            })
                            quizzes.append(quiz)
                    
                    except Exception as e:
                        continue
        
        return quizzes

# API Endpoints

@api_view(['GET'])
@permission_classes([AllowAny])
def get_course_exercises(request, course_slug):
    """Get all exercises for a specific course"""
    level = request.GET.get('level')
    exercise_type = request.GET.get('type')
    
    api = ExercisesQuizzesAPI()
    exercises = api.get_course_exercises(course_slug, level)
    
    # Filter by type if specified
    if exercise_type:
        exercises = [ex for ex in exercises if ex.get('type') == exercise_type]
    
    return Response({
        'course_slug': course_slug,
        'level': level,
        'type': exercise_type,
        'exercises': exercises,
        'total': len(exercises)
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def get_course_quizzes(request, course_slug):
    """Get all quizzes for a specific course"""
    level = request.GET.get('level')
    quiz_type = request.GET.get('type')
    
    api = ExercisesQuizzesAPI()
    quizzes = api.get_course_quizzes(course_slug, level)
    
    # Filter by type if specified
    if quiz_type:
        quizzes = [q for q in quizzes if q.get('type') == quiz_type]
    
    return Response({
        'course_slug': course_slug,
        'level': level,
        'type': quiz_type,
        'quizzes': quizzes,
        'total': len(quizzes)
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def get_exercise_detail(request, course_slug, exercise_id):
    """Get detailed information about a specific exercise"""
    api = ExercisesQuizzesAPI()
    exercises = api.get_course_exercises(course_slug)
    
    exercise = next((ex for ex in exercises if ex['id'] == exercise_id), None)
    if not exercise:
        return Response({'error': 'Exercise not found'}, status=status.HTTP_404_NOT_FOUND)
    
    return Response({
        'exercise': exercise
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def get_quiz_detail(request, course_slug, quiz_id):
    """Get detailed information about a specific quiz"""
    api = ExercisesQuizzesAPI()
    quizzes = api.get_course_quizzes(course_slug)
    
    quiz = next((q for q in quizzes if q['id'] == quiz_id), None)
    if not quiz:
        return Response({'error': 'Quiz not found'}, status=status.HTTP_404_NOT_FOUND)
    
    return Response({
        'quiz': quiz
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_exercise_answer(request, course_slug, exercise_id):
    """Submit an answer for an exercise"""
    api = ExercisesQuizzesAPI()
    exercises = api.get_course_exercises(course_slug)
    
    exercise = next((ex for ex in exercises if ex['id'] == exercise_id), None)
    if not exercise:
        return Response({'error': 'Exercise not found'}, status=status.HTTP_404_NOT_FOUND)
    
    answer = request.data.get('answer', '')
    if not answer:
        return Response({'error': 'Answer required'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Simple validation for coding exercises
    if exercise.get('type') == 'coding':
        # Check if answer contains code
        is_valid = len(answer.strip()) > 10  # Basic validation
        feedback = "Good job!" if is_valid else "Please provide a more complete solution."
    else:
        # For practical exercises, any answer is considered valid
        is_valid = len(answer.strip()) > 0
        feedback = "Thank you for your submission!" if is_valid else "Please provide an answer."
    
    return Response({
        'exercise_id': exercise_id,
        'correct': is_valid,
        'feedback': feedback,
        'submitted_answer': answer
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_quiz_answer(request, course_slug, quiz_id):
    """Submit an answer for a quiz question"""
    api = ExercisesQuizzesAPI()
    quizzes = api.get_course_quizzes(course_slug)
    
    quiz = next((q for q in quizzes if q['id'] == quiz_id), None)
    if not quiz:
        return Response({'error': 'Quiz not found'}, status=status.HTTP_404_NOT_FOUND)
    
    answer = request.data.get('answer', '')
    if not answer:
        return Response({'error': 'Answer required'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Check answer correctness
    correct_answer = quiz.get('correct_answer')
    is_correct = False
    feedback = ""
    
    if quiz.get('type') == 'multiple_choice':
        is_correct = answer.lower().strip() == correct_answer.lower().strip() if correct_answer else False
        feedback = "Correct!" if is_correct else f"The correct answer is {correct_answer}" if correct_answer else "Answer submitted."
    elif quiz.get('type') == 'true_false':
        is_correct = answer.lower().strip() == correct_answer.lower().strip() if correct_answer else False
        feedback = "Correct!" if is_correct else f"The correct answer is {correct_answer}" if correct_answer else "Answer submitted."
    
    return Response({
        'quiz_id': quiz_id,
        'correct': is_correct,
        'feedback': feedback,
        'correct_answer': correct_answer,
        'submitted_answer': answer
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def get_exercises_stats(request):
    """Get statistics about exercises and quizzes"""
    api = ExercisesQuizzesAPI()
    
    # Get all courses
    courses = []
    if os.path.exists(EXPANDED_CONTENT_PATH):
        for item in os.listdir(EXPANDED_CONTENT_PATH):
            item_path = os.path.join(EXPANDED_CONTENT_PATH, item)
            if os.path.isdir(item_path) and not item.startswith('.'):
                courses.append(item)
    
    total_exercises = 0
    total_quizzes = 0
    course_stats = []
    
    for course_slug in courses:
        exercises = api.get_course_exercises(course_slug)
        quizzes = api.get_course_quizzes(course_slug)
        
        total_exercises += len(exercises)
        total_quizzes += len(quizzes)
        
        course_stats.append({
            'course_slug': course_slug,
            'exercises_count': len(exercises),
            'quizzes_count': len(quizzes),
            'total_activities': len(exercises) + len(quizzes)
        })
    
    return Response({
        'total_courses': len(courses),
        'total_exercises': total_exercises,
        'total_quizzes': total_quizzes,
        'total_activities': total_exercises + total_quizzes,
        'course_stats': course_stats
    })



