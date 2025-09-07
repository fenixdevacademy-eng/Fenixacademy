export const coursesData = [
  {
    id: 1,
    title: "Fundamentos de Desenvolvimento Web",
    description: "Aprenda HTML, CSS e JavaScript do zero. Construa sites responsivos e interativos.",
    instructor: "Alexandre Mendes",
    level: "beginner",
    duration: "80 horas",
    students: 1247,
    rating: 4.8,
    price: 197,
    originalPrice: 297,
    image: "/courses/web-dev.jpg",
    category: "Desenvolvimento Web",
    lessons: 80,
    certificate: true,
    featured: true,
    discount: 34,
    modules: [
      {
        id: 1,
        title: "Introdução ao Desenvolvimento Web",
        description: "Módulo 1 do curso Fundamentos de Desenvolvimento Web",
        duration: 240,
        lessons: [
          {
            id: 1,
            title: "O que é Desenvolvimento Web?",
            duration: 1800,
            type: "video",
            content: "Introdução ao desenvolvimento web",
            video_url: "https://example.com/video1.mp4",
            transcript: "Transcrição da aula...",
            resources: [],
            exercises: [],
            completed: false
          }
        ],
        completed: false
      }
    ]
  }
]; 