export interface Translations {
    [key: string]: {
        [language: string]: string;
    };
}

export const translations: Translations = {
    // Cabeçalho do curso
    'courseHeader': {
        'pt-BR': 'Conteúdo CS50 Personalizado - Qualidade Harvard',
        'en': 'Personalized CS50 Content - Harvard Quality',
        'es': 'Contenido CS50 Personalizado - Calidad Harvard',
        'de': 'Personalisierter CS50-Inhalt - Harvard-Qualität'
    },
    'characters': {
        'pt-BR': 'caracteres',
        'en': 'characters',
        'es': 'caracteres',
        'de': 'Zeichen'
    },
    'lastUpdate': {
        'pt-BR': 'Última atualização',
        'en': 'Last updated',
        'es': 'Última actualización',
        'de': 'Zuletzt aktualisiert'
    },
    'modules': {
        'pt-BR': 'Módulos',
        'en': 'Modules',
        'es': 'Módulos',
        'de': 'Module'
    },

    // Navegação por abas
    'content': {
        'pt-BR': 'Conteúdo',
        'en': 'Content',
        'es': 'Contenido',
        'de': 'Inhalt'
    },
    'exercises': {
        'pt-BR': 'Exercícios Práticos',
        'en': 'Practical Exercises',
        'es': 'Ejercicios Prácticos',
        'de': 'Praktische Übungen'
    },
    'modulesTab': {
        'pt-BR': 'Módulos',
        'en': 'Modules',
        'es': 'Módulos',
        'de': 'Module'
    },

    // Exercícios práticos
    'practicalExercisesTitle': {
        'pt-BR': '💻 Exercícios Práticos CS50',
        'en': '💻 CS50 Practical Exercises',
        'es': '💻 Ejercicios Prácticos CS50',
        'de': '💻 CS50 Praktische Übungen'
    },
    'practicalExercisesDescription': {
        'pt-BR': 'Aprenda fazendo! Execute estes exercícios práticos para consolidar seu conhecimento.',
        'en': 'Learn by doing! Complete these practical exercises to consolidate your knowledge.',
        'es': '¡Aprende haciendo! Completa estos ejercicios prácticos para consolidar tu conocimiento.',
        'de': 'Lerne durch Tun! Führe diese praktischen Übungen durch, um dein Wissen zu festigen.'
    },
    'openEditor': {
        'pt-BR': 'Abrir Editor',
        'en': 'Open Editor',
        'es': 'Abrir Editor',
        'de': 'Editor öffnen'
    },
    'copyCode': {
        'pt-BR': 'Copiar Código',
        'en': 'Copy Code',
        'es': 'Copiar Código',
        'de': 'Code kopieren'
    },

    // Exercícios específicos
    'htmlBasicTitle': {
        'pt-BR': 'Criar uma página HTML básica',
        'en': 'Create a basic HTML page',
        'es': 'Crear una página HTML básica',
        'de': 'Erstelle eine grundlegende HTML-Seite'
    },
    'htmlBasicDescription': {
        'pt-BR': 'Crie uma página HTML com título, cabeçalho e parágrafo sobre desenvolvimento web.',
        'en': 'Create an HTML page with title, header and paragraph about web development.',
        'es': 'Crea una página HTML con título, encabezado y párrafo sobre desarrollo web.',
        'de': 'Erstelle eine HTML-Seite mit Titel, Überschrift und Absatz über Webentwicklung.'
    },
    'cssStylingTitle': {
        'pt-BR': 'Estilizar com CSS',
        'en': 'Style with CSS',
        'es': 'Estilizar con CSS',
        'de': 'Mit CSS gestalten'
    },
    'cssStylingDescription': {
        'pt-BR': 'Adicione estilos CSS para tornar a página mais atraente.',
        'en': 'Add CSS styles to make the page more attractive.',
        'es': 'Añade estilos CSS para hacer la página más atractiva.',
        'de': 'Füge CSS-Stile hinzu, um die Seite attraktiver zu gestalten.'
    },
    'javascriptInteractiveTitle': {
        'pt-BR': 'Interatividade com JavaScript',
        'en': 'Interactivity with JavaScript',
        'es': 'Interactividad con JavaScript',
        'de': 'Interaktivität mit JavaScript'
    },
    'javascriptInteractiveDescription': {
        'pt-BR': 'Adicione um botão que altera o texto da página.',
        'en': 'Add a button that changes the page text.',
        'es': 'Añade un botón que cambie el texto de la página.',
        'de': 'Füge einen Button hinzu, der den Seitentext ändert.'
    },

    // Módulos
    'courseStructure': {
        'pt-BR': '📚 Estrutura do Curso',
        'en': '📚 Course Structure',
        'es': '📚 Estructura del Curso',
        'de': '📚 Kursstruktur'
    },
    'courseStructureDescription': {
        'pt-BR': 'Navegue pelos módulos e arquivos do curso para encontrar conteúdo específico.',
        'en': 'Navigate through course modules and files to find specific content.',
        'es': 'Navega por los módulos y archivos del curso para encontrar contenido específico.',
        'de': 'Navigiere durch Kursmodule und -dateien, um spezifische Inhalte zu finden.'
    },
    'files': {
        'pt-BR': 'arquivo(s)',
        'en': 'file(s)',
        'es': 'archivo(s)',
        'de': 'Datei(en)'
    },
    'view': {
        'pt-BR': 'Visualizar',
        'en': 'View',
        'es': 'Visualizar',
        'de': 'Anzeigen'
    },

    // Editor de código
    'codeEditor': {
        'pt-BR': 'Editor de Código',
        'en': 'Code Editor',
        'es': 'Editor de Código',
        'de': 'Code-Editor'
    },
    'expectedResult': {
        'pt-BR': 'Resultado Esperado',
        'en': 'Expected Result',
        'es': 'Resultado Esperado',
        'de': 'Erwartetes Ergebnis'
    },
    'expectedOutput': {
        'pt-BR': 'Output Esperado:',
        'en': 'Expected Output:',
        'es': 'Salida Esperada:',
        'de': 'Erwartete Ausgabe:'
    },
    'executeCode': {
        'pt-BR': 'Executar Código',
        'en': 'Execute Code',
        'es': 'Ejecutar Código',
        'de': 'Code ausführen'
    },
    'downloadSolution': {
        'pt-BR': 'Baixar Solução',
        'en': 'Download Solution',
        'es': 'Descargar Solución',
        'de': 'Lösung herunterladen'
    },

    // Estados e mensagens
    'loading': {
        'pt-BR': 'Carregando conteúdo CS50...',
        'en': 'Loading CS50 content...',
        'es': 'Cargando contenido CS50...',
        'de': 'CS50-Inhalt wird geladen...'
    },
    'noContent': {
        'pt-BR': 'Nenhum conteúdo encontrado',
        'en': 'No content found',
        'es': 'No se encontró contenido',
        'de': 'Kein Inhalt gefunden'
    },
    'errorLoading': {
        'pt-BR': 'Erro ao carregar conteúdo',
        'en': 'Error loading content',
        'es': 'Error al cargar contenido',
        'de': 'Fehler beim Laden des Inhalts'
    },
    'unknownError': {
        'pt-BR': 'Erro desconhecido',
        'en': 'Unknown error',
        'es': 'Error desconocido',
        'de': 'Unbekannter Fehler'
    },

    // Placeholders
    'typeCodeHere': {
        'pt-BR': 'Digite seu código aqui...',
        'en': 'Type your code here...',
        'es': 'Escribe tu código aquí...',
        'de': 'Schreibe deinen Code hier...'
    }
};

export const getTranslation = (key: string, language: string): string => {
    const translation = translations[key];
    if (!translation) {
        console.warn(`Translation key not found: ${key}`);
        return key;
    }

    const translatedText = translation[language];
    if (!translatedText) {
        console.warn(`Translation not found for language: ${language} and key: ${key}`);
        return translation['en'] || key; // Fallback para inglês
    }

    return translatedText;
};

export const supportedLanguages = ['pt-BR', 'en', 'es', 'de'];
export const defaultLanguage = 'pt-BR';






