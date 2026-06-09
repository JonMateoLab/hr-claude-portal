const LEARNING_PATH = [
    {
        id: 1,
        icon: "&#129504;",
        title: "Qué es Claude y cómo empezar",
        subtitle: "Tu primera conversación con la IA que está cambiando el trabajo en consultoría",
        duration: "20 min",
        difficulty: "basico",
        intro: "Claude es el asistente de IA de Anthropic, diseñado para razonar con cuidado y comunicarse con claridad, dos cualidades que un HRBP necesita a diario. A diferencia de otras herramientas, Claude no solo genera texto: analiza, estructura y adapta su respuesta al contexto que tú le das. En este capítulo vas a entender qué hace diferente a Claude, cómo crear tu cuenta y dar tus primeros pasos en la interfaz.",
        topics: [
            "Qué es un modelo de lenguaje grande (LLM) y por qué importa para HRBP",
            "Claude vs. otras IAs: posicionamiento y diferencias clave",
            "El modelo de conversación: cómo funciona el chat con Claude",
            "Tour por la interfaz de claude.ai"
        ],
        content: [
            {
                type: "concept",
                title: "¿Qué es un LLM y qué significa para tu trabajo?",
                text: "Un modelo de lenguaje grande (LLM) es un sistema entrenado con enormes cantidades de texto que aprende a predecir y generar lenguaje humano con coherencia. Para un HRBP, esto significa tener acceso a un colaborador que puede leer un documento de 50 páginas, extraer los puntos clave y redactar un resumen ejecutivo en minutos. No es magia: es estadística avanzada al servicio de tu productividad."
            },
            {
                type: "concept",
                title: "Claude vs. otras IAs: ¿qué lo hace diferente?",
                text: "Mientras que otras herramientas priorizan la velocidad o la creatividad sin filtros, Claude está diseñado para ser preciso, honesto y útil en contextos profesionales. Anthropic construyó Claude con principios de seguridad y utilidad que lo hacen especialmente adecuado para tareas sensibles de RRHH: analizar datos de personas, redactar comunicaciones internas o preparar briefings para stakeholders. Claude reconoce cuando no sabe algo y lo dice, en lugar de inventar respuestas."
            },
            {
                type: "concept",
                title: "Claude vs ChatGPT vs Claude Code: elige la herramienta correcta",
                text: "En Accenture conviven tres herramientas de IA principales. ChatGPT (OpenAI) es un asistente generalista con 128K tokens y buenas integraciones visuales (DALL·E). Claude (web/app) es un asistente conversacional con 200K tokens de contexto, superior en razonamiento, documentos largos y redacción institucional en español — ideal para el HRBP que necesita analizar y generar documentos. Claude Code (CLI) es un agente en tu terminal que lee y escribe archivos reales, ejecuta scripts y automatiza procesos completos — sin equivalente en el mercado. La regla práctica: usa Claude web para pensar y producir documentos, y Claude Code cuando necesites actuar sobre archivos reales de tu máquina."
            },
            {
                type: "concept",
                title: "Los tres modelos: Opus, Sonnet y Haiku",
                text: "Claude tiene tres variantes. Opus es el más potente, ideal para razonamiento complejo y tareas que requieren profundidad analítica — úsalo cuando arranques un análisis de cero o necesites un plan estratégico elaborado. Sonnet es el equilibrio entre rendimiento y velocidad, perfecto para el trabajo diario del HRBP: redacción, análisis de datos, preparación de briefings. Haiku es el más rápido y ligero, bueno para tareas simples y puntuales como reformular un párrafo o clasificar información. En la interfaz de Claude puedes cambiar de modelo en cualquier momento con /model."
            },
            {
                type: "concept",
                title: "Activación de Claude Enterprise en Accenture",
                text: "Accenture tiene un acuerdo Enterprise con Anthropic. El acceso es mediante SSO corporativo — no necesitas crear una cuenta personal. El proceso tiene dos fases: primero, revisar las Responsible AI Use Guidelines, firmar el Responsible AI Agreement y solicitar licencia en el Software Catalog (necesitarás un WBS). Una vez tengas licencia, accede a claude.ai con tu email @accenture.com y haz clic en 'Continue with SSO'. Para Claude Code, selecciona la opción 'Enterprise' durante el login — si seleccionas 'Personal' no quedará vinculado a tu licencia corporativa. El soporte técnico es vía ServiceNow, categoría 'Claude Enterprise'."
            },
            {
                type: "tip",
                text: "Cuando entres a claude.ai por primera vez, tómate 5 minutos para explorar la barra lateral. Ahí encontrarás el historial de conversaciones y la opción de crear Proyectos, que son fundamentales para organizar tu trabajo como HRBP. No empieces con la tarea más crítica del día: practica con algo de bajo riesgo, como pedirle que te explique un concepto de RRHH."
            },
            {
                type: "example",
                title: "Ejemplo práctico",
                prompt: "Hola Claude, soy HRBP de una consultora tecnológica grande. Estoy a cargo de una capability de Software & Platform Engineering con unos 400 profesionales. Mi día a día incluye gestionar el talento, apoyar a los People Leads, preparar briefings para el MD y trabajar con datos de workforce. ¿Puedes ayudarme a entender cómo puedes ser útil en mi rol concreto?",
                explanation: "Este prompt de presentación establece tu contexto profesional desde el primer mensaje, lo que permite a Claude adaptar todas sus respuestas futuras a tu realidad específica en Accenture."
            },
            {
                type: "exercise",
                title: "Tu primera conversación real",
                instructions: "1. Entra a claude.ai y crea tu cuenta con tu correo corporativo o personal. 2. Inicia una nueva conversación. 3. Copia y adapta el prompt del ejemplo práctico con tus datos reales (nombre de tu capability, número aproximado de headcount, tus responsabilidades principales). 4. Lee la respuesta de Claude y haz una pregunta de seguimiento sobre alguno de los puntos que mencione. Objetivo: que termines esta primera sesión sintiéndote cómodo con el flujo de conversación."
            }
        ],
        resources: [
            {
                name: "Anthropic Academy: Claude 101",
                url: "https://anthropic.skilljar.com/",
                type: "curso",
                desc: "Curso oficial de Anthropic para empezar con Claude desde cero",
                free: true
            },
            {
                name: "Workday: Claude Certified Architect Foundations",
                url: "https://wd103.myworkday.com/accenture/d/inst/15$378651/17816$38282.htmld",
                type: "curso",
                desc: "Certificación oficial de Anthropic Academy disponible en Workday Learning de Accenture",
                free: true
            },
            {
                name: "Workday: AI Fluency Framework & Foundations",
                url: "https://www.coursera.org/learn/ai-fluency-framework-foundations",
                type: "curso",
                desc: "Fundamentos de IA generativa y marco de aplicación práctica — también disponible en Workday",
                free: true
            }
        ],
        relatedPrompts: []
    },
    {
        id: 2,
        icon: "&#9997;&#65039;",
        title: "El arte del prompting",
        subtitle: "Cómo hablarle a Claude para obtener resultados que realmente puedes usar",
        duration: "25 min",
        difficulty: "basico",
        intro: "La calidad de lo que obtienes de Claude depende directamente de cómo se lo pides. Un HRBP que sabe escribir buenos prompts puede obtener un análisis de workforce en 10 minutos en lugar de 2 horas. En este capítulo aprenderás el framework CRAFT y técnicas prácticas para que cada conversación con Claude sea eficiente desde el primer mensaje.",
        topics: [
            "El framework CRAFT: Contexto, Rol, Acción, Formato, Tono",
            "Cómo iterar y refinar tus prompts",
            "Uso de etiquetas XML para estructurar peticiones complejas",
            "Errores comunes y cómo evitarlos"
        ],
        content: [
            {
                type: "concept",
                title: "El framework CRAFT para HRBP",
                text: "CRAFT son las cinco dimensiones de un prompt efectivo: Contexto (quién eres, qué situación tienes), Rol (qué papel quieres que Claude juegue), Acción (qué quieres que haga exactamente), Formato (cómo quieres recibir la respuesta), Tono (el registro adecuado para tu audiencia). Un prompt que incluye todos estos elementos elimina la ambigüedad y te da respuestas utilizables en lugar de genéricas."
            },
            {
                type: "concept",
                title: "Iterar como conversación, no como búsqueda",
                text: "Muchos usuarios cometen el error de tratar Claude como un buscador: hacen una pregunta, no les gusta el resultado y empiezan de nuevo. La clave está en iterar sobre la misma conversación: 'Bien, pero ahora hazlo más conciso', 'Adapta esto para un MD que prefiere bullet points', 'Añade una sección de riesgos'. Claude recuerda todo el contexto de la conversación, así que puedes ir refinando sin repetirte."
            },
            {
                type: "concept",
                title: "Etiquetas XML para peticiones complejas",
                text: "Cuando tu petición tiene múltiples partes o quieres que Claude procese datos específicos, las etiquetas XML te ayudan a estructurar el input. Por ejemplo, puedes usar <datos>, <contexto>, <instrucciones> para separar claramente qué es información de entrada y qué es la tarea. Claude las reconoce de forma nativa y las usa para organizar mejor su respuesta."
            },
            {
                type: "example",
                title: "Ejemplo práctico",
                prompt: "Actúa como un consultor senior de People Strategy con experiencia en firmas de tecnología. \n\nContexto: Soy HRBP de una capability de Software & Platform Engineering en Accenture con 380 profesionales. Tenemos un 18% de attrition en los últimos 6 meses, por encima del benchmark de la firma.\n\nTarea: Ayúdame a preparar una lista de 5 causas más probables de este nivel de attrition en una capability tech de consultoría, ordenadas por probabilidad, con una breve explicación de cada una.\n\nFormato: Lista numerada, cada punto con título en negrita y 2-3 líneas de explicación. Máximo 400 palabras en total.\n\nTono: Profesional pero directo, pensado para presentar internamente a mi MD.",
                explanation: "Este prompt aplica el framework CRAFT completo: establece el rol de Claude, proporciona contexto específico, define la acción con detalle, especifica el formato exacto y el tono adecuado para la audiencia."
            },
            {
                type: "exercise",
                title: "Compara un prompt débil con uno CRAFT",
                instructions: "1. Escribe primero este prompt débil en Claude: 'Dime por qué la gente deja las consultoras tech'. 2. Lee la respuesta. 3. Ahora escribe el mismo prompt usando el framework CRAFT, adaptado a tu situación real (tu capability, tu headcount, un problema real que tengas). 4. Compara ambas respuestas en términos de especificidad, utilidad y aplicabilidad directa a tu trabajo. Anota qué elementos del framework CRAFT marcaron más diferencia."
            }
        ],
        resources: [
            {
                name: "Guía de Prompt Engineering de Anthropic",
                url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
                type: "guia",
                desc: "Guía oficial y completa de Anthropic sobre técnicas de prompting",
                free: true
            },
            {
                name: "Tutorial Interactivo de Prompt Engineering",
                url: "https://github.com/anthropics/prompt-eng-interactive-tutorial",
                type: "curso",
                desc: "Ejercicios prácticos interactivos para dominar el prompting con Claude",
                free: true
            }
        ],
        relatedPrompts: ["hr1", "hr2", "co1"]
    },
    {
        id: 3,
        icon: "&#128202;",
        title: "Claude para analizar datos",
        subtitle: "De tablas en Excel a insights accionables en minutos",
        duration: "30 min",
        difficulty: "intermedio",
        intro: "Una de las tareas más consumidoras de tiempo para un HRBP es convertir datos brutos de workforce en información útil para tomar decisiones. Claude puede leer tablas, identificar patrones, calcular métricas y explicar lo que significan, todo en lenguaje natural. En este capítulo aprenderás a pegar datos de Excel directamente en Claude y obtener análisis que antes te llevaban horas.",
        topics: [
            "Cómo pegar datos tabulares correctamente en Claude",
            "Métricas clave de workforce y cómo pedirlas",
            "Solicitar visualizaciones y comparativas",
            "Iterar sobre el análisis para profundizar"
        ],
        content: [
            {
                type: "concept",
                title: "Cómo pasar datos a Claude de forma efectiva",
                text: "Claude puede leer tablas en formato de texto plano (copiar y pegar desde Excel o Google Sheets funciona bien), CSV, o incluso tablas de Markdown. La clave es dar contexto antes de los datos: qué representan las columnas, qué período cubren, qué unidades tienen los números. Sin ese contexto, Claude puede hacer suposiciones incorrectas. Siempre termina el bloque de datos con una instrucción clara sobre qué quieres analizar."
            },
            {
                type: "concept",
                title: "Pedir métricas específicas vs. análisis libre",
                text: "Puedes pedirle a Claude métricas concretas (attrition rate, headcount por grade, ratio de promociones) o dejar que identifique patrones de forma abierta. Para el trabajo diario de HRBP, suele ser más eficiente empezar con métricas específicas que ya necesitas y luego hacer una pregunta abierta de 'qué más llama tu atención en estos datos'. Esta secuencia te da rigor primero y descubrimiento después."
            },
            {
                type: "tip",
                text: "Si tienes datos sensibles, nunca pegues nombres completos ni identificadores personales en Claude. Anonimiza usando iniciales, IDs o categorías (ej: 'Analyst A', 'Senior Engineer con 3 años'). Puedes hacer el mismo análisis con datos anonimizados y obtener los mismos insights. Cuando tengas dudas sobre privacidad, consulta la política de uso de datos de IA de tu organización."
            },
            {
                type: "example",
                title: "Ejemplo práctico",
                prompt: "Tengo datos de workforce de mi capability de Software & Platform Engineering. Voy a pegar una tabla con la siguiente estructura: Nivel, Headcount, Joiners últimos 6 meses, Leavers últimos 6 meses, Headcount objetivo fin de año.\n\n<datos>\nAnalyst, 45, 12, 8, 50\nSenior Analyst, 78, 15, 18, 80\nConsultant, 95, 10, 22, 90\nSenior Consultant, 67, 5, 12, 70\nManager, 42, 3, 6, 45\nSenior Manager, 28, 2, 3, 30\n</datos>\n\nPor favor:\n1. Calcula el attrition rate por nivel (leavers/headcount en %)\n2. Identifica los tres niveles con mayor riesgo desde perspectiva de talent\n3. Estima si estamos en camino de cumplir el headcount objetivo a fin de año asumiendo las tendencias actuales\n4. Dame tus observaciones más relevantes en un párrafo ejecutivo de máximo 100 palabras",
                explanation: "Este prompt estructura los datos con etiquetas XML, proporciona contexto claro sobre las columnas y pide un análisis en cuatro partes bien diferenciadas, incluyendo un cierre ejecutivo listo para usar."
            },
            {
                type: "exercise",
                title: "Analiza datos reales de tu capability",
                instructions: "1. Extrae de tu sistema de RRHH (SAP, Workday o el que uses) una tabla sencilla con al menos headcount y una métrica de movimiento (joiners/leavers) por nivel o por proyecto. 2. Anonimiza si necesario. 3. Pégala en Claude con el formato del ejemplo, adaptado a tus columnas reales. 4. Pide el análisis básico. 5. Luego añade una segunda pregunta: '¿Qué preguntas adicionales deberíamos hacernos con estos datos?' Esto te mostrará cómo Claude puede ayudarte a pensar más allá de los números inmediatos."
            }
        ],
        resources: [
            {
                name: "Anthropic Prompt Library",
                url: "https://docs.anthropic.com/en/prompt-library/library",
                type: "guia",
                desc: "Biblioteca de prompts oficiales de Anthropic para casos de uso variados",
                free: true
            },
            {
                name: "Coursera: AI Fundamentals with Claude",
                url: "https://www.coursera.org/learn/ai-for-everyone-ai-fundamentals-with-claude",
                type: "curso",
                desc: "Fundamentos de IA aplicada con Claude para profesionales no técnicos",
                free: false
            }
        ],
        relatedPrompts: ["pa1", "pa2", "pa3", "pa5", "cc1", "cc3"]
    },
    {
        id: 4,
        icon: "&#128196;",
        title: "Crear documentos y presentaciones",
        subtitle: "Emails, políticas, comunicados y presentaciones HTML con transiciones",
        duration: "25 min",
        difficulty: "intermedio",
        intro: "Un HRBP dedica una parte significativa de su tiempo a producir documentos: comunicaciones internas, actualizaciones de políticas, presentaciones para el leadership. Claude puede acelerar drásticamente esta parte del trabajo si sabes cómo estructurar tus peticiones y cómo iterar sobre los borradores. En este capítulo también aprenderás a generar presentaciones en HTML que puedes exportar a PDF directamente desde el navegador.",
        topics: [
            "Prompting para estructura y tono en documentos",
            "Control del registro: de informal a ejecutivo",
            "Generación de presentaciones HTML con transiciones",
            "Exportar a PDF y flujos de trabajo con documentos generados"
        ],
        content: [
            {
                type: "concept",
                title: "Estructurar peticiones de documentos",
                text: "Para obtener documentos de calidad, Claude necesita saber: el tipo de documento (email, policy brief, comunicado), la audiencia (equipo operativo, People Leads, MD, toda la capability), el objetivo del documento (informar, pedir acción, alinear), el tono (formal, cercano, urgente) y cualquier restricción específica (máximo número de palabras, incluir fecha límite, no mencionar nombres). Cuantos más de estos elementos des, menos iteraciones necesitarás."
            },
            {
                type: "concept",
                title: "Presentaciones HTML: la alternativa a PowerPoint",
                text: "Claude puede generar presentaciones completas en HTML con diseño visual, transiciones entre diapositivas y elementos interactivos. Solo tienes que abrirlas en el navegador y usar Ctrl+P (o Cmd+P) para exportarlas a PDF. Son especialmente útiles para comunicaciones rápidas que no requieren el nivel de diseño de una presentación corporativa formal. Claude puede incluir tablas, gráficos de texto, listas visuales y secciones de puntos clave."
            },
            {
                type: "tip",
                text: "Cuando generes un documento con Claude, nunca lo envíes directamente. Siempre lee el borrador completo y ajusta al menos una cosa, aunque sea pequeña. Esto te asegura que el documento tiene tu voz y refleja el contexto específico que solo tú conoces. Considera usar Claude para el 80% del trabajo y reservar el 20% final para tu juicio profesional."
            },
            {
                type: "example",
                title: "Ejemplo práctico",
                prompt: "Necesito dos outputs para la misma situación:\n\n<contexto>\nSituación: Lanzamos un nuevo proceso de Performance Review que arranca en 3 semanas. Es la primera vez que usamos este proceso en nuestra capability de Software & Platform Engineering. Habrá sesiones de calibración por grade band.\n</contexto>\n\nOutput 1: Comunicado interno para enviar por email a todos los 380 profesionales de la capability. Tono: claro, cercano pero profesional. Máximo 200 palabras. Debe incluir fechas clave, qué se espera de ellos y un contact para preguntas.\n\nOutput 2: Una presentación HTML de 5 slides para usar en el kick-off con People Leads la semana que viene. Incluye: agenda, por qué este proceso, timeline, responsabilidades de los People Leads, próximos pasos. Diseño limpio con colores corporativos azul/blanco. Con transiciones CSS entre slides.",
                explanation: "Este prompt solicita dos formatos distintos para la misma situación comunicativa, demostrando cómo Claude puede adaptar el mismo contenido a audiencias y canales diferentes en una sola petición."
            },
            {
                type: "exercise",
                title: "Transforma un comunicado existente",
                instructions: "1. Busca un email o comunicado interno que hayas enviado en los últimos 3 meses. 2. Copia el texto y pásaselo a Claude con la instrucción: 'Aquí tienes un comunicado que envié anteriormente. Por favor, reescríbelo para que sea un 30% más conciso, con el mismo mensaje pero más directo. También crea una versión HTML de 3 slides con los puntos clave para presentarlo en formato visual.' 3. Compara las versiones y reflexiona sobre qué aprendes sobre tu propio estilo de escritura a partir de las diferencias."
            }
        ],
        resources: [
            {
                name: "Coursera: AI Automation with Claude",
                url: "https://www.coursera.org/learn/ai-for-everyone-ai-automation-with-claude",
                type: "curso",
                desc: "Cómo usar Claude para automatizar tareas de creación de contenido y documentos",
                free: false
            }
        ],
        relatedPrompts: ["co1", "co2", "co3", "co4", "pr1", "pr2", "cc13"]
    },
    {
        id: 5,
        icon: "&#129504;",
        title: "Claude como HRBP advisor",
        subtitle: "Tu compañero de pensamiento estratégico para briefings, decisiones y narrativas",
        duration: "30 min",
        difficulty: "intermedio",
        intro: "El mayor salto de productividad para un HRBP no viene de usar Claude para redactar textos más rápido, sino de usarlo como socio de pensamiento estratégico. Antes de una reunión con el MD, antes de tomar una decisión de talento compleja, antes de preparar una recomendación: Claude puede ayudarte a estructurar el análisis, anticipar preguntas y construir una narrativa con datos. En este capítulo aprendes a usar Claude no como herramienta de escritura, sino como tu mejor sparring partner profesional.",
        topics: [
            "Claude como asesor estratégico, no solo como redactor",
            "Cómo enmarcar decisiones complejas de talento",
            "Construir narrativas con datos para stakeholders",
            "Preparar briefings ejecutivos desde datos brutos"
        ],
        content: [
            {
                type: "concept",
                title: "El cambio de mentalidad: de herramienta a asesor",
                text: "La mayoría de los usuarios usan Claude para ejecutar: 'redacta esto', 'resume aquello'. El uso avanzado es para pensar: 'ayúdame a estructurar este problema', 'qué argumentos debería anticipar', 'cómo presentaría esto un consultor senior'. Cuando le pides a Claude que te ayude a pensar en lugar de a producir, obtienes perspectivas que genuinamente amplían tu análisis y no solo ahorran tiempo."
            },
            {
                type: "concept",
                title: "Enmarcar decisiones de talento",
                text: "Antes de llegar a una reunión de talento con una recomendación, puedes usar Claude para hacer un stress test de tu posición. Dale el contexto completo (la persona, el rol, los datos de performance, las restricciones) y pídele que te argumente tanto a favor como en contra de tu recomendación. Esto te prepara para las objeciones que encontrarás y fortalece tu posición antes de entrar en la sala."
            },
            {
                type: "tip",
                text: "Para las conversaciones más sensibles (casos de gestión de talento complicados, situaciones con personas en riesgo de salida), usa Claude en modo exploratorio primero: describe la situación sin nombres y pide que te ayude a pensar en el framework adecuado. Luego puedes concretar en una conversación separada. Separar el pensamiento estratégico de la ejecución te permite usar Claude con más libertad en los casos más delicados."
            },
            {
                type: "example",
                title: "Ejemplo práctico",
                prompt: "Tengo una reunión con el MD de mi capability mañana. Necesito prepararle un briefing ejecutivo sobre la situación del talento. Aquí están los datos brutos que tengo:\n\n<datos_workforce>\n- Headcount actual: 380 profesionales\n- Attrition últimos 6 meses: 8.2% (benchmark firma: 6%)\n- Nivel más afectado: Consultants (12% attrition)\n- Proyectos con riesgo de staffing: 3 (dos cuentas top, una cuenta nueva estratégica)\n- Pipeline de hiring: 15 offers aceptadas para los próximos 2 meses\n- Engagement score último pulso: 67/100 (bajó 8 puntos vs. Q1)\n- Principales temas en comentarios abiertos del pulso: carga de trabajo, visibilidad de carrera, trabajo remoto\n</datos_workforce>\n\nActúa como un Chief People Officer experimentado. Ayúdame a:\n1. Identificar las 2-3 prioridades que el MD necesita conocer urgentemente\n2. Construir la narrativa que conecte attrition + engagement + riesgo de proyectos\n3. Proponer 3 acciones concretas que pueda recomendar con impacto en 90 días\n4. Anticipar las 3 preguntas difíciles que me hará el MD y cómo responderlas\n\nFormato: Briefing ejecutivo de máximo una página, con sección de acciones y sección de anticipación de preguntas al final.",
                explanation: "Este prompt convierte datos brutos en un briefing ejecutivo estructurado, pidiendo a Claude que actúe como CPO para elevar la calidad del análisis y que anticipe las preguntas del MD para preparar al HRBP para la reunión."
            },
            {
                type: "exercise",
                title: "Prepara tu próxima reunión con Claude",
                instructions: "1. Identifica una reunión importante que tengas en los próximos 7 días (con el MD, con un People Lead, con un cliente interno). 2. Escribe en un documento todos los datos relevantes que tienes: métricas, situaciones, contexto. 3. Pégaselo a Claude y pídele que actúe como tu preparador de reuniones: que identifique qué puntos deberías enfatizar, qué objeciones anticipar y cómo estructurar tu mensaje principal. 4. Anota las ideas de Claude que no habías considerado. 5. Después de la reunión, reflexiona sobre qué predicciones de Claude fueron acertadas."
            }
        ],
        resources: [
            {
                name: "Claude for HR: Tutorial Oficial",
                url: "https://claude.com/resources/tutorials/claude-for-human-resources",
                type: "guia",
                desc: "Tutorial oficial de Anthropic sobre casos de uso de Claude en Recursos Humanos",
                free: true
            }
        ],
        relatedPrompts: ["hr1", "hr2", "hr3", "hr4", "hr5", "hr6", "hr7"]
    },
    {
        id: 6,
        icon: "&#127775;",
        title: "Talent, engagement y people analytics",
        subtitle: "Talent reviews, análisis de engagement y planes de retención con soporte de IA",
        duration: "30 min",
        difficulty: "intermedio",
        intro: "El corazón del trabajo de un HRBP en una capability de Software & Platform Engineering es gestionar el talento con precisión: saber quién está listo para el siguiente nivel, quién está en riesgo de salida, qué dice el engagement survey debajo de la superficie. Claude puede ser tu copiloto en estas tres dimensiones, ayudándote a interpretar datos complejos y a construir planes de acción que sean más que respuestas genéricas.",
        topics: [
            "Usar Claude en análisis de 9-box y talent reviews",
            "Interpretar datos de engagement más allá de los promedios",
            "Construir planes de acción desde datos de engagement",
            "Análisis de patrones de attrition y retención"
        ],
        content: [
            {
                type: "concept",
                title: "Claude en el proceso de talent review",
                text: "Durante una talent review, manejas información de múltiples fuentes: performance ratings, feedback de People Leads, datos de movilidad, aspiraciones declaradas. Claude puede ayudarte a sintetizar esta información para cada perfil en una evaluación equilibrada, identificar sesgos en los datos que te presentan y construir argumentos sólidos para tus recomendaciones de colocación en el 9-box. Recuerda anonimizar siempre los datos antes de pegarlos."
            },
            {
                type: "concept",
                title: "Del engagement score al plan de acción",
                text: "El error más común en el análisis de engagement es quedarse en los promedios. Un score de 72/100 puede esconder un 90 en un grupo y un 55 en otro. Claude es especialmente bueno para analizar los comentarios abiertos de surveys de engagement: puede identificar temas emergentes, agrupar frustraciones similares expresadas de forma diferente y conectar patrones entre el score cuantitativo y los comentarios cualitativos. El resultado: un análisis más rico que el informe estándar de la herramienta."
            },
            {
                type: "tip",
                text: "Para el análisis de engagement, copia los comentarios abiertos directamente en Claude (anonimizados) y pídele que los agrupe por temas y que identifique cuáles son más urgentes. Luego pide que conecte cada tema con una hipótesis de causa raíz y con una intervención posible. Este proceso, que antes podía llevarte horas de lectura manual, lo puedes hacer en 15 minutos."
            },
            {
                type: "example",
                title: "Ejemplo práctico",
                prompt: "Acabo de recibir los resultados del engagement survey de mi capability. Tengo los siguientes datos:\n\n<resultados_cuantitativos>\nEngagement global: 68/100 (bajó 9 puntos vs. año anterior)\nDimensiones más bajas:\n- Desarrollo de carrera: 61/100\n- Carga de trabajo y bienestar: 58/100\n- Reconocimiento: 64/100\n\nDimensiones más altas:\n- Relación con el equipo directo: 81/100\n- Orgullo de pertenencia a Accenture: 79/100\n\nParticipación: 74%\n</resultados_cuantitativos>\n\n<comentarios_abiertos_muestra>\n'No veo hacia dónde va mi carrera aquí, llevo 2 años en el mismo rol'\n'Los proyectos son interesantes pero la carga es insostenible a largo plazo'\n'Mi manager es muy bueno pero no tenemos visibilidad de las oportunidades internas'\n'Se habla mucho de wellbeing pero en la práctica los deadlines siempre ganan'\n'No sé si haré carrera en consulting o si debería irme a producto'\n'El feedback que recibo es escaso y llega muy tarde'\n</comentarios_abiertos_muestra>\n\nActúa como consultor de People Analytics. Necesito:\n1. Un análisis narrativo de qué está pasando realmente en mi capability (más allá de los números)\n2. Los 3 focos de intervención prioritarios con argumentación\n3. Un plan de acción de 90 días con 2-3 acciones concretas por foco\n4. Un párrafo que pueda usar para comunicar los resultados a los People Leads de forma honesta y constructiva",
                explanation: "Este prompt combina datos cuantitativos y cualitativos de engagement para obtener un análisis integrado que va más allá del informe estándar de la herramienta, produciendo outputs directamente accionables."
            },
            {
                type: "exercise",
                title: "Analiza el último pulso de engagement de tu capability",
                instructions: "1. Descarga los resultados del último survey de engagement de tu capability (o pulso de clima si no tienes survey completo). 2. Extrae los scores por dimensión y al menos 10-15 comentarios abiertos representativos. 3. Anonimiza los comentarios. 4. Pega todo en Claude con el prompt del ejemplo adaptado a tus datos. 5. Compara el análisis de Claude con las conclusiones que tu propia herramienta de engagement generó automáticamente. ¿Qué ve Claude que la herramienta no vio? ¿Qué le falta?"
            }
        ],
        resources: [
            {
                name: "AIHR: Claude for HR",
                url: "https://www.aihr.com/blog/claude-for-hr/",
                type: "guia",
                desc: "Guía práctica de AIHR sobre cómo usar Claude en procesos de Recursos Humanos",
                free: true
            }
        ],
        relatedPrompts: ["tr1", "tr2", "tr3", "er1", "er2", "er3", "pa1", "pa2"]
    },
    {
        id: 7,
        icon: "&#128187;",
        title: "Claude Code: automatización real para HRBP",
        subtitle: "Del chat a la terminal: cómo Claude Code ejecuta tareas reales con tus archivos",
        duration: "30 min",
        difficulty: "intermedio",
        intro: "Claude Code es una herramienta de línea de comandos que pone Claude dentro de tu terminal. No es chatear: es delegar trabajo real a una IA que lee y escribe tus archivos, ejecuta scripts y automatiza procesos completos. Para un HRBP, esto significa que puedes pedirle que lea todos los Excel de una carpeta, genere un informe consolidado y lo guarde listo para enviar — sin copiar y pegar nada. Este capítulo te introduce en Claude Code adaptado a tu día a día.",
        topics: [
            "Qué es Claude Code y en qué se diferencia de Claude web",
            "Asistentes vs Agentes: entender el espectro de autonomía",
            "CLAUDE.md: tu archivo de contexto permanente",
            "Skills: macros inteligentes para tareas recurrentes",
            "Limitaciones y comandos esenciales"
        ],
        content: [
            {
                type: "concept",
                title: "Claude web vs Claude Code: la diferencia clave",
                text: "Claude web es para pensar juntos — intercambias ideas, texto, documentos en un chat. Claude Code es para ejecutar — le dices 'lee esta carpeta, genera este informe, guárdalo aquí' y lo hace. La misma inteligencia, capacidad de acción muy distinta. Claude Code trabaja directamente en tu sistema de archivos (local, OneDrive o SharePoint sincronizado), navega por tus carpetas, crea y edita archivos reales. Para un HRBP, esto significa automatizar tareas como: consolidar datos de headcount de múltiples Excel, generar comunicados personalizados por equipo, o crear presentaciones HTML directamente desde datos."
            },
            {
                type: "concept",
                title: "Asistentes vs Agentes: saber qué pedirle a Claude",
                text: "No toda IA trabaja igual. Un asistente genera output que tú aplicas (copias, pegas, ajustas). Un agente recibe un objetivo, planifica los pasos, lee y escribe archivos reales, ejecuta código e itera hasta completar la tarea — tú supervisas. Claude web funciona como asistente. Claude Code funciona como agente. Usa asistentes cuando quieras explorar ideas, generar borradores o tareas puntuales de un solo paso. Usa agentes cuando la tarea implica varios pasos encadenados, necesita leer y guardar archivos, o quieres automatizar algo recurrente."
            },
            {
                type: "concept",
                title: "CLAUDE.md: el contexto que Claude recuerda siempre",
                text: "Por defecto, cada sesión de Claude empieza de cero. Pero con un archivo CLAUDE.md en tu carpeta de proyecto, Claude lo lee automáticamente al arrancar y sabe quién eres, en qué proyecto estás y cómo trabajas. Hay dos tipos: tu CLAUDE.md personal (con tu rol, proyectos activos, forma de trabajar) y el CLAUDE.md del proyecto (con el cliente, fase, idioma, plantillas, restricciones). Al cerrar cada sesión, pide a Claude que actualice el CLAUDE.md con lo aprendido — con el tiempo se vuelve más rico y cada sesión arranca con el estado real."
            },
            {
                type: "concept",
                title: "Skills: macros inteligentes que se invocan con un comando",
                text: "Una skill es un comando especial de Claude Code que se activa escribiendo /nombre-skill. En lugar de explicar paso a paso qué hacer, la skill ya lleva incorporadas las instrucciones, el contexto y el flujo de trabajo. Imagina que en lugar de escribir un prompt de 200 palabras cada vez que necesitas una presentación, simplemente escribes /ppt 'Análisis de attrition Q3 — 6 diapositivas'. Las skills de Accenture son las distribuidas a nivel corporativo por la +IA o las configuradas por cada persona. No se descargan de internet."
            },
            {
                type: "concept",
                title: "Limitaciones: lo que Claude no puede hacer",
                text: "Claude no tiene acceso a internet en tiempo real — su conocimiento tiene fecha de corte. No se conecta directamente a SharePoint, SAP o Teams (trabaja con archivos locales que tú le facilitas). Puede alucinar: cifras, fechas y referencias pueden sonar plausibles pero ser incorrectas — siempre verifica. En conversaciones muy largas pierde contexto anterior. Y recuerda: Claude no decide, propone. La validación y decisión final son siempre tuya."
            },
            {
                type: "tip",
                text: "El primer paso productivo con Claude Code es crear tu CLAUDE.md personal. Abre PowerShell, navega a tu carpeta de proyecto (cd C:\\Proyectos\\MiProyecto) y escribe 'claude'. Luego pídele: 'Crea mi CLAUDE.md personal basándote en lo que te cuente'. Descríbele tu rol, tu capability, tus proyectos y cómo trabajas. Claude lo guardará y lo leerá automáticamente en cada sesión futura."
            },
            {
                type: "example",
                title: "Ejemplo práctico: automatizar un informe de headcount",
                prompt: "Navega a la carpeta 'Datos_Workforce' y lee todos los archivos Excel que encuentres. Para cada uno:\n1. Extrae las columnas de nombre del equipo, headcount actual, joiners y leavers\n2. Consolida todo en una tabla resumen con una fila por equipo\n3. Calcula el attrition rate por equipo\n4. Genera un HTML con diseño limpio que muestre la tabla y destaque en rojo los equipos con attrition superior al 10%\n5. Guárdalo como 'informe_headcount_consolidado.html'\n\nAntes de ejecutar, muéstrame el plan de lo que vas a hacer y espera mi confirmación.",
                explanation: "Este prompt muestra el poder de Claude Code como agente: lee múltiples archivos, procesa datos, genera un entregable visual y lo guarda — todo en una sola instrucción. El punto de control al final es una buena práctica para mantener el control."
            },
            {
                type: "exercise",
                title: "Tu primer comando en Claude Code",
                instructions: "1. Abre PowerShell y navega a una carpeta de proyecto: cd C:\\Users\\tu.nombre\\OneDrive\\Proyecto. 2. Escribe 'claude' para lanzar Claude Code. 3. Escríbele: 'Lee los archivos de esta carpeta y dime qué hay — nombre, tipo y un resumen breve de cada uno'. 4. Observa cómo Claude navega y lee los archivos reales de tu máquina. 5. Ahora prueba: 'Genera un CLAUDE.md para este proyecto basándote en los archivos que has leído. Incluye: nombre del proyecto, tipo de contenido, estructura de carpetas y recomendaciones de uso'. 6. Revisa el archivo generado y ajústalo con instrucciones adicionales. Comandos útiles: /clear (limpiar contexto), /undo (deshacer último cambio), Escape (interrumpir)."
            }
        ],
        resources: [
            {
                name: "Workday: Claude Code in Action",
                url: "https://wd103.myworkday.com/accenture/d/inst/15$378651/17816$38282.htmld",
                type: "curso",
                desc: "Uso práctico de Claude Code: comandos, flujos de trabajo, automatización — disponible en Workday Learning",
                free: true
            },
            {
                name: "Workday: Introduction to Model Context Protocol (MCP)",
                url: "https://wd103.myworkday.com/accenture/d/inst/15$378651/17816$38282.htmld",
                type: "curso",
                desc: "Cómo conectar Claude con herramientas externas mediante MCP — nivel medio",
                free: true
            }
        ],
        relatedPrompts: ["cc18", "cc22", "pr4"]
    },
    {
        id: 8,
        icon: "&#128274;",
        title: "Uso responsable y seguridad en Accenture",
        subtitle: "Qué puedes compartir con Claude, cómo anonimizar datos y las reglas del juego en la firma",
        duration: "20 min",
        difficulty: "intermedio",
        intro: "Claude Enterprise de Accenture no usa tus prompts para entrenar el modelo. Pero privacidad del modelo no equivale a que puedas subir cualquier dato. Este capítulo cubre las reglas esenciales de uso responsable de IA en Accenture, adaptadas al contexto del HRBP que trabaja con datos de personas, contratos de cliente y comunicaciones sensibles. Saber qué puedes y qué no puedes compartir con Claude es tan importante como saber usarlo.",
        topics: [
            "Qué datos puedes y no puedes compartir con Claude",
            "Cómo anonimizar datos de personas antes de usar IA",
            "Qué hacer cuando el contrato del cliente prohíbe usar IA",
            "Verificación antes de enviar: el checklist del HRBP",
            "Glosario de términos clave de IA y Claude"
        ],
        content: [
            {
                type: "concept",
                title: "Las tres zonas: nunca, con precaución, siempre",
                text: "NUNCA compartas con Claude: datos personales identificables (DNI, email personal, fecha de nacimiento, historial médico), contratos con cláusulas de confidencialidad, contraseñas o credenciales, información clasificada como Restricted. CON PRECAUCIÓN: datos de proyecto de cliente (confirma primero con el CAL — algunos contratos prohíben el uso de IA), no mezcles datos de clientes distintos en la misma conversación, contenido de terceros (riesgos de propiedad intelectual). SIEMPRE: etiqueta el output con el nivel de confidencialidad más alto de los datos que usaste, revisa el output antes de compartir (alucinaciones, sesgos, imprecisiones), para asesoramiento legal o de RRHH contacta siempre con Legal."
            },
            {
                type: "concept",
                title: "Anonimización: trabaja con datos sin exponer personas",
                text: "Como HRBP trabajas constantemente con datos de personas. La regla es simple: anonimiza antes de pegar. En lugar de 'María García, Senior Consultant, 3 años en la firma, performance rating 3' usa 'Persona_01, SC, 3 años, rating 3'. Los patrones y conclusiones del análisis son igual de válidos con datos anonimizados. Claude no necesita saber quién es la persona para analizar su perfil de talento o riesgo de salida. Usa IDs, iniciales o categorías genéricas."
            },
            {
                type: "concept",
                title: "Contratos de cliente que prohíben IA",
                text: "Algunos contratos con administraciones públicas o clientes con altos requisitos de seguridad prohíben el uso de IA para procesar sus datos. Esto no significa que no puedas usar Claude — significa que debes separar lo que haces con y sin datos del cliente. Puedes usar Claude para: preparar plantillas vacías, redactar con datos ficticios, generar marcos de análisis y metodologías, revisar documentos internos de Accenture. No puedes usar Claude para: procesar documentos reales del cliente, analizar datos de usuarios del sistema, generar output que incorpore datos del entorno cliente."
            },
            {
                type: "concept",
                title: "Glosario esencial para el HRBP",
                text: "Prompt: el mensaje o instrucción que le escribes a Claude. Token: unidad mínima de texto (1 token ≈ 4 caracteres ≈ 0,75 palabras; Claude maneja hasta 200K tokens). Contexto/Ventana de contexto: todo lo que Claude 've' en una sesión (historial + archivos + CLAUDE.md); al cerrar se borra. Alucinación: cuando Claude genera información incorrecta con aparente confianza — siempre verifica. CLAUDE.md: archivo de instrucciones permanentes que Claude lee al arrancar. Modelo: la versión de Claude (Opus = potente, Sonnet = equilibrado, Haiku = rápido). MCP: protocolo para conectar Claude con herramientas externas. SSO: autenticación única con credenciales corporativas @accenture.com."
            },
            {
                type: "tip",
                text: "Antes de enviar cualquier entregable generado con Claude a un cliente o a tu leadership, pasa siempre este checklist mental: ¿Los datos numéricos están verificados con la fuente original? ¿Las referencias normativas o de políticas son correctas? ¿Se ha aplicado lenguaje inclusivo? ¿La terminología es coherente con la del cliente? ¿El nivel de confidencialidad está etiquetado? Si la respuesta a alguna es 'no', revísalo antes de enviar."
            },
            {
                type: "example",
                title: "Ejemplo: anonimizar datos de talent review",
                prompt: "Voy a darte datos de un talent review anonimizados. Necesito que los analices.\n\n<datos_talent>\nPersona_01: SC, 4 años, rating 4, alta en 9-box (alto potencial/alto rendimiento), expresó interés en management track\nPersona_02: C, 2 años, rating 3, media en 9-box, sin desarrollo visible en 6 meses\nPersona_03: SM, 8 años, rating 5, alta en 9-box, riesgo de salida medio (benchmark salarial por debajo)\nPersona_04: A, 1 año, rating 3, baja en 9-box, feedback mixto de People Lead\nPersona_05: SC, 5 años, rating 2, media-baja en 9-box, señales de burnout\n</datos_talent>\n\nPara cada persona:\n1. Evaluación de riesgo (retención, desarrollo, performance)\n2. Acción recomendada prioritaria\n3. Conversación que debería tener el HRBP con esta persona o su People Lead\n\nFormato: tabla con columnas ID, Riesgo principal, Acción, Conversación clave.",
                explanation: "Este ejemplo muestra cómo trabajar con datos de personas sin exponer identidades. Los códigos (Persona_01, SC, A) mantienen el análisis útil sin comprometer la privacidad. Claude puede identificar patrones y recomendar acciones igual de bien con datos anonimizados."
            },
            {
                type: "exercise",
                title: "Anonimiza y analiza datos reales",
                instructions: "1. Piensa en 5 personas de tu capability que estés gestionando activamente (talent review, riesgo de salida, desarrollo, etc.). 2. Crea una tabla anonimizada con sus datos clave: nivel, antigüedad, rating, posición en 9-box, señales relevantes. Usa IDs genéricos (Persona_01, etc.) y códigos de nivel (A, SA, C, SC, M, SM). 3. Pégala en Claude con el prompt del ejemplo, adaptado a tu situación. 4. Compara las recomendaciones de Claude con las acciones que ya tenías pensadas. ¿Hay alguna perspectiva nueva? 5. Reflexiona: ¿te sentiste cómodo con el nivel de anonimización? ¿Necesitas más abstracción para tu contexto?"
            }
        ],
        resources: [
            {
                name: "Accenture: Responsible AI Use Guidelines",
                url: "https://in.accenture.com/responsibleai/",
                type: "guia",
                desc: "Directrices internas de Accenture para el uso responsable de herramientas de IA Enterprise",
                free: true
            },
            {
                name: "Claude Enterprise: Viva Engage Community",
                url: "https://web.yammer.com/main/groups/",
                type: "comunidad",
                desc: "Comunidad interna de Accenture para Claude Enterprise — anuncios, aprendizaje entre pares y preguntas",
                free: true
            }
        ],
        relatedPrompts: ["tr1", "tr2", "pa1"]
    },
    {
        id: 9,
        icon: "&#9889;",
        title: "Flujos de trabajo avanzados",
        subtitle: "Prompt chaining, Proyectos, plantillas reutilizables y flujos visuales antes de ejecutar",
        duration: "25 min",
        difficulty: "avanzado",
        intro: "Una vez que dominas los prompts individuales, el siguiente nivel es conectarlos en flujos de trabajo completos. Un HRBP avanzado usa prompt chaining (la salida de un prompt se convierte en la entrada del siguiente), aprovecha la funcionalidad de Proyectos de Claude para mantener contexto persistente, y construye plantillas reutilizables que aceleran las tareas recurrentes. En este capítulo aprenderás a diseñar flujos de trabajo que transforman datos brutos en deliverables listos para presentar.",
        topics: [
            "Prompt chaining: conectar outputs como inputs en secuencia",
            "Claude Projects: contexto persistente para tu trabajo de HRBP",
            "Construir plantillas de prompts reutilizables",
            "Diseñar flujos completos de datos a presentación"
        ],
        content: [
            {
                type: "concept",
                title: "Prompt chaining: el HRBP como director de orquesta",
                text: "El prompt chaining consiste en diseñar una secuencia de prompts donde la salida de cada uno se convierte en la entrada del siguiente. Para un HRBP, un ejemplo típico es: Paso 1 (análisis), Paso 2 (estrategia) y Paso 3 (comunicación). Este enfoque produce resultados de mayor calidad porque cada paso puede ser optimizado por separado, y permite revisar y corregir entre etapas antes de continuar."
            },
            {
                type: "concept",
                title: "Claude Projects: tu espacio de trabajo persistente",
                text: "La funcionalidad de Proyectos en Claude te permite crear un espacio con contexto persistente: puedes subir documentos (políticas de RRHH, guías de carrera, organigramas), definir instrucciones permanentes sobre cómo quieres que Claude te responda, y mantener conversaciones relacionadas organizadas. Para un HRBP, esto significa que puedes crear un Proyecto para tu capability donde Claude ya sabe quién eres, qué capability llevas y cuáles son tus principales documentos de referencia, sin tener que repetirlo en cada sesión."
            },
            {
                type: "concept",
                title: "Flujos visuales: dibuja antes de ejecutar",
                text: "El error más común al automatizar con Claude es pedirle que ejecute antes de haber definido la lógica. Antes de que Claude toque ningún archivo, pídele que genere un diagrama del flujo: pasos, decisiones, puntos de control y salidas. Puedes pedirle un diagrama en texto o incluso un HTML interactivo con el flujo visual. Revísalo, corrígelo en lenguaje natural si no refleja lo que quieres, y solo entonces dale luz verde. Cambiar un diagrama es instantáneo; deshacer código ejecutado no siempre lo es."
            },
            {
                type: "concept",
                title: "Cierre de sesión: consolida lo aprendido",
                text: "Al final de cada sesión productiva, usa este prompt de cierre: 'Antes de terminar: ¿qué has aprendido en esta sesión que debería quedar guardado? Incluye contexto del proyecto, decisiones tomadas y cualquier preferencia mía que hayas detectado. Dame el texto listo para copiar al CLAUDE.md.' Con el tiempo, tanto tu CLAUDE.md personal como el del proyecto se vuelven más ricos — y Claude arranca cada sesión con el estado real del proyecto, no desde cero."
            },
            {
                type: "tip",
                text: "Cuando construyas una plantilla de prompt reutilizable, usa corchetes para marcar las variables: [NOMBRE_CAPABILITY], [HEADCOUNT], [PERÍODO], [MÉTRICA_PRINCIPAL]. Esto te permite tener el esqueleto del prompt guardado y simplemente rellenar los huecos cuando lo uses. Guarda tus mejores plantillas en un documento de texto plano que puedas copiar rápidamente cuando las necesites."
            },
            {
                type: "example",
                title: "Ejemplo práctico",
                prompt: "Voy a ejecutar un flujo de trabajo de 3 pasos. Por favor, completa cada paso antes de pasar al siguiente.\n\nPASO 1 - ANÁLISIS:\nAquí tienes datos de workforce de mi capability de Software & Platform Engineering (Q3):\n- Attrition: 9.1% (benchmark: 6%)\n- Headcount: 365 (objetivo fin de año: 400)\n- Engagement: 65/100 (bajó 11 puntos)\n- Top 3 temas de salida en exit interviews: falta de visibilidad de carrera, compensación por debajo de mercado tech, escasez de proyectos de producto\n- Promociones realizadas: 18 (objetivo era 25)\n\nAnaliza estos datos e identifica los 3 problemas estructurales más relevantes. Usa datos concretos para cada uno.\n\n[Espera mi confirmación para continuar con el Paso 2]\n\nPASO 2 - ESTRATEGIA (tras recibir el análisis del Paso 1):\nBasándote en el análisis anterior, diseña una propuesta de 3 iniciativas de People para los próximos 6 meses. Cada iniciativa debe incluir: objetivo, acciones concretas, owner recomendado y métricas de éxito.\n\n[Espera mi confirmación para continuar con el Paso 3]\n\nPASO 3 - PRESENTACIÓN (tras recibir la estrategia del Paso 2):\nConvierte el análisis y la estrategia en una presentación HTML de 6 slides lista para presentar al MD. Incluye: slide de contexto, slide de diagnóstico (con los 3 problemas), 3 slides de iniciativas (una por iniciativa) y slide de next steps. Diseño ejecutivo, limpio, con tabla de datos en el slide de diagnóstico.",
                explanation: "Este prompt chain lleva el mismo caso desde datos brutos hasta una presentación ejecutiva en tres etapas secuenciales, permitiendo al HRBP revisar y aprobar cada paso antes de continuar."
            },
            {
                type: "exercise",
                title: "Crea tu primer Proyecto de Claude",
                instructions: "1. En claude.ai, busca la sección de Proyectos y crea uno nuevo llamado '[Tu capability] - HRBP Workspace'. 2. En las instrucciones del proyecto, escribe un párrafo describiendo tu capability, tu rol, el headcount aproximado y los 3-4 temas que más trabajas (talent, engagement, comunicaciones, analytics). 3. Sube al proyecto al menos un documento de referencia que uses frecuentemente (una guía de carrera, un template de talent review, una política de RRHH). 4. Inicia una conversación en ese proyecto y observa cómo Claude ya tiene el contexto de base sin que se lo repitas. 5. Prueba a hacer una pregunta sobre un tema de tu capability y verifica que las respuestas reflejan el contexto que configuraste."
            }
        ],
        resources: [
            {
                name: "Anthropic Academy: Advanced Cowork",
                url: "https://anthropic.skilljar.com/",
                type: "curso",
                desc: "Módulos avanzados de Anthropic Academy sobre flujos de trabajo con Claude",
                free: true
            },
            {
                name: "Anthropic Blog: Prompt Engineering for Business",
                url: "https://www.anthropic.com/news/prompt-engineering-for-business-performance",
                type: "guia",
                desc: "Artículo de Anthropic sobre prompt engineering aplicado a contextos empresariales",
                free: true
            }
        ],
        relatedPrompts: ["cc18", "cc13", "cc22", "pr4"]
    },
    {
        id: 10,
        icon: "&#128197;",
        title: "Tu semana con Claude como HRBP",
        subtitle: "Rutinas semanales, plantillas para tareas recurrentes y cuándo NO usar IA",
        duration: "20 min",
        difficulty: "avanzado",
        intro: "El objetivo final no es usar Claude para tareas puntuales, sino integrarlo en tu flujo de trabajo semanal de forma que multiplique tu capacidad sistemáticamente. Un HRBP que ha interiorizado bien el uso de IA tiene rituales: el lunes prepara su semana con Claude, el miércoles hace un check-in de las iniciativas activas y el viernes cierra con un wrap-up. En este capítulo construirás esa rutina y aprenderás también cuándo es mejor no usar Claude.",
        topics: [
            "El patrón lunes-miércoles-viernes del HRBP con IA",
            "Plantillas reutilizables para tareas semanales recurrentes",
            "Medir tu ganancia de productividad real",
            "Cuándo NO usar Claude: los límites importantes"
        ],
        content: [
            {
                type: "concept",
                title: "La rutina semanal del HRBP con Claude",
                text: "Una rutina efectiva tiene tres momentos clave: el lunes (orientación estratégica), el miércoles (revisión de progreso) y el viernes (cierre y comunicación). El lunes usas Claude para revisar tus prioridades de la semana en función de los datos más recientes, anticipar conversaciones difíciles y preparar la agenda de reuniones. El miércoles haces un check rápido de las iniciativas activas: ¿hay señales de alerta en los datos de esta semana? El viernes produces el weekly report y planificas los follow-ups. Esta estructura convierte Claude de herramienta puntual a compañero habitual."
            },
            {
                type: "concept",
                title: "Cuándo NO usar Claude",
                text: "Claude es potente, pero no es adecuado para todo. No uses Claude cuando la confidencialidad sea crítica y no tengas certeza de las políticas de privacidad de tu organización. No uses Claude para sustituir conversaciones humanas reales: una conversación difícil con un Senior Manager sobre su performance necesita tu presencia y tu empatía, no una respuesta generada por IA. No delegues en Claude decisiones que requieren tu juicio contextual sobre personas concretas. Y no uses Claude cuando el tiempo de briefing a la IA es mayor que el tiempo de hacer la tarea directamente: para un email de dos líneas, escríbelo tú."
            },
            {
                type: "concept",
                title: "Comandos de referencia rápida",
                text: "Comandos de arranque en PowerShell: 'claude' (lanza Claude Code en la carpeta actual), 'claude -c' o 'claude --continue' (retoma la última sesión con todo el contexto), 'claude \"prompt\"' (modo one-shot, ejecuta y devuelve sin modo interactivo). Slash commands dentro de Claude Code: /clear (limpia contexto de la sesión — úsalo al cambiar de tema), /init (genera CLAUDE.md del proyecto leyendo archivos), /memory (gestiona memoria persistente entre sesiones), /model (cambia entre Opus, Sonnet y Haiku), /cost (muestra coste acumulado de la sesión), /undo (revierte el último cambio). Tecla Escape para interrumpir en cualquier momento."
            },
            {
                type: "tip",
                text: "Para medir tu ganancia real de productividad, durante las primeras 4 semanas anota cuánto tiempo te habría llevado cada tarea sin Claude. Muchos HRBPs descubren que la mayor ganancia no está en las tareas de redacción (donde el ahorro es de 15-20 minutos) sino en las tareas de análisis y síntesis (donde el ahorro puede ser de 1-2 horas). Este dato te ayuda a priorizar dónde aplicar más Claude en tu rutina."
            },
            {
                type: "example",
                title: "Ejemplo práctico",
                prompt: "Es lunes por la mañana. Voy a preparar mi semana con tu ayuda.\n\n<contexto_semana>\nCapability: Software & Platform Engineering\nHeadcount: 378\nSemana clave: Esta semana arranca el proceso de mid-year review. Hay 3 personas en conversación de oferta de salida. El MD ha pedido una actualización de la situación de staffing para el jueves. Hay un People Lead que necesita coaching urgente después de un episodio de gestión complicado con su equipo.\n\nMis prioridades declaradas esta semana:\n1. Preparar briefing de staffing para el MD (jueves)\n2. Conversación de coaching con el People Lead (martes)\n3. Kick-off del proceso de mid-year review con comunicado a toda la capability\n4. Seguimiento de las 3 personas en riesgo de salida\n</contexto_semana>\n\nNecesito que me ayudes a:\n1. Ordenar mis prioridades por urgencia e impacto real (con tu perspectiva, no solo la mía)\n2. Identificar qué podría salir mal esta semana y cómo prevenirlo\n3. Sugerir en qué tareas puedes ayudarme más durante la semana\n4. Crear un borrador de agenda para el martes (asumiendo que tengo 4 horas de trabajo profundo disponibles ese día)\n\nSé directo y práctico. Nada de genéricos.",
                explanation: "Este prompt de Weekly HRBP Report convierte el lunes en un momento de orientación estratégica asistida por IA, combinando contexto situacional con solicitud de priorización y planificación táctica."
            },
            {
                type: "exercise",
                title: "Construye tu rutina durante 2 semanas",
                instructions: "1. Durante las próximas 2 semanas, comprométete a usar Claude al inicio de al menos 3 días laborables (lunes, miércoles y viernes). 2. El lunes: usa el prompt del ejemplo adaptado a tu situación real para planificar la semana. 3. El miércoles: haz un check rápido describiendo el estado de tus prioridades y pide a Claude que identifique riesgos o ajustes necesarios. 4. El viernes: pide a Claude que te ayude a preparar el weekly report o comunicación de cierre de semana más relevante que tengas. 5. Al final de las 2 semanas, anota: ¿qué tareas aceleraste más? ¿En qué momentos Claude no fue útil? ¿Qué harías diferente? Usa estas reflexiones para personalizar tu rutina definitiva."
            }
        ],
        resources: [
            {
                name: "Workday: Claude Certified Architect Foundations",
                url: "https://wd103.myworkday.com/accenture/d/inst/15$378651/17816$38282.htmld",
                type: "curso",
                desc: "Certificación oficial completa — cubre fundamentos técnicos y prácticos de Claude, con trazabilidad de horas formativas",
                free: true
            },
            {
                name: "Workday: Claude Code in Action",
                url: "https://wd103.myworkday.com/accenture/d/inst/15$378651/17816$38282.htmld",
                type: "curso",
                desc: "Uso práctico de Claude Code: comandos, flujos de trabajo y automatización",
                free: true
            },
            {
                name: "Hacking HR: Guía Claude para HR",
                url: "https://hackinghrlab.io/resources/claude-ai-for-hr",
                type: "guia",
                desc: "Guía práctica de la comunidad Hacking HR sobre aplicaciones de Claude en RRHH",
                free: true
            }
        ],
        relatedPrompts: ["hr1", "hr4", "pa5", "co1", "rt1", "rt2"]
    }
];
