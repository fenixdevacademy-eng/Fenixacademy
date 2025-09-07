import InteractiveLearningHub from '../components/InteractiveLearningHub';

export default function InteractiveDemoPage() {
    return (
        <InteractiveLearningHub
            showAllComponents={true}
            defaultView="slides"
        />
    );
}

export const metadata = {
    title: 'Fenix Interactive Hub - Demonstração dos Elementos Interativos',
    description: 'Explore todos os elementos interativos da plataforma Fenix Academy: slides, infográficos, quizzes, simuladores, code playground e projetos colaborativos.',
    keywords: 'fenix academy, elementos interativos, slides, infográficos, quizzes, simuladores, code playground, projetos colaborativos, educação tecnologia',
};
