// Mock courses data
export const coursesData = [
    {
        id: '1',
        title: 'JavaScript Completo',
        description: 'Aprenda JavaScript do zero ao avançado',
        price: 197,
        originalPrice: 497,
        image: '/images/courses/javascript.jpg',
        duration: '40 horas',
        level: 'Iniciante',
        rating: 4.8,
        students: 1250,
        category: 'Frontend'
    },
    {
        id: '2',
        title: 'Python para Data Science',
        description: 'Domine Python e análise de dados',
        price: 297,
        originalPrice: 697,
        image: '/images/courses/python.jpg',
        duration: '60 horas',
        level: 'Intermediário',
        rating: 4.9,
        students: 980,
        category: 'Data Science'
    },
    {
        id: '3',
        title: 'React Avançado',
        description: 'Desenvolvimento moderno com React',
        price: 197,
        originalPrice: 397,
        image: '/images/courses/react.jpg',
        duration: '35 horas',
        level: 'Intermediário',
        rating: 4.7,
        students: 2100,
        category: 'Frontend'
    }
];

export const getCourseById = (id: string) => {
    return coursesData.find(course => course.id === id);
};

export const getCoursesByCategory = (category: string) => {
    return coursesData.filter(course => course.category === category);
};