#!/usr/bin/env python
"""
Script para corrigir problemas de imagens no frontend
"""
import os
import base64
from PIL import Image, ImageDraw, ImageFont
import io

def create_placeholder_image(width, height, text, filename):
    """Criar imagem placeholder"""
    # Criar imagem
    img = Image.new('RGB', (width, height), color='#3B82F6')
    draw = ImageDraw.Draw(img)
    
    # Adicionar texto
    try:
        font = ImageFont.truetype("arial.ttf", 24)
    except:
        font = ImageFont.load_default()
    
    # Centralizar texto
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (width - text_width) // 2
    y = (height - text_height) // 2
    
    draw.text((x, y), text, fill='white', font=font)
    
    # Salvar
    img.save(filename)
    print(f"✅ Criada: {filename}")

def main():
    """Função principal"""
    print("🖼️ Corrigindo imagens do frontend")
    print("=" * 40)
    
    # Criar pasta public se não existir
    public_dir = "public"
    if not os.path.exists(public_dir):
        os.makedirs(public_dir)
        print(f"📁 Criada pasta: {public_dir}")
    
    # Criar pasta avatars
    avatars_dir = os.path.join(public_dir, "avatars")
    if not os.path.exists(avatars_dir):
        os.makedirs(avatars_dir)
        print(f"📁 Criada pasta: {avatars_dir}")
    
    # Criar pasta courses
    courses_dir = os.path.join(public_dir, "courses")
    if not os.path.exists(courses_dir):
        os.makedirs(courses_dir)
        print(f"📁 Criada pasta: {courses_dir}")
    
    # Imagens necessárias
    images = [
        # Hero image
        ("hero-image.png", 800, 600, "Fenix Academy"),
        
        # Avatars
        ("avatars/maria.jpg", 100, 100, "Maria"),
        ("avatars/joao.jpg", 100, 100, "João"),
        ("avatars/ana.jpg", 100, 100, "Ana"),
        
        # Course images
        ("courses/python-basics.jpg", 400, 300, "Python"),
        ("courses/javascript-complete.jpg", 400, 300, "JavaScript"),
        ("courses/react-nextjs.jpg", 400, 300, "React"),
    ]
    
    # Criar imagens
    for filename, width, height, text in images:
        filepath = os.path.join(public_dir, filename)
        if not os.path.exists(filepath):
            create_placeholder_image(width, height, text, filepath)
        else:
            print(f"⏭️ Já existe: {filename}")
    
    print("\n✅ Todas as imagens foram criadas!")
    print("🚀 Execute: npm run dev")

if __name__ == '__main__':
    main() 