const EXERCISES = [
    {
        id: 1,
        icon: "&#9733;",
        title: "Preparar un Talent Review / Calibración",
        desc: "Usa Claude para sintetizar los feedbacks que ya tienes (cliente, People Lead, mentor y KPIs de HR), preparar una visión equilibrada por persona y llegar a la sesión con el Talent Lead con todo ordenado.",
        difficulty: "medium",
        time: "15 min",
        steps: [
            {
                title: "Consolida los inputs que ya tienes por persona",
                text: "Llegas al talent review con feedback de varias fuentes: input de cliente, input del People Lead o mentor, y los KPIs de people de HR. Pega esos inputs (anonimizados) y pide a Claude que los consolide en una ficha equilibrada por persona, señalando dónde coinciden y dónde se contradicen. No le pides que decida ni que coloque a nadie: le pides síntesis para llegar preparado/a a la sesión con el Talent Lead.",
                code: `Eres un HRBP preparando un Talent Review en una consultora tecnológica. Para cada persona tengo inputs de tres fuentes que ya he recogido. Consolídalos en una ficha equilibrada por persona. No coloques a nadie en una matriz ni tomes decisiones: sintetiza la información y señala coincidencias y contradicciones entre fuentes.

<inputs>
Persona_01 (Senior Manager, 6 años):
- Input cliente: muy satisfecho, lideró el delivery de un programa crítico y consiguió una extensión.
- Input People Lead: sólido técnicamente, pero delega poco y se sobrecarga.
- KPIs HR: rating "Exceeds", 0 incidencias, ha mentorizado a 2 personas.

Persona_02 (Consultant, 2 años):
- Input cliente: feedback mixto, dificultades para gestionar expectativas.
- Input mentor: muestra ganas pero le falta autonomía técnica.
- KPIs HR: rating "Meets", sin desarrollo visible en 6 meses.

Persona_03 (Manager, 4 años):
- Input cliente: positivo y constante.
- Input People Lead: ha asumido el mentoring de 2 analistas sin que se lo pidieran.
- KPIs HR: rating "Meets", potencial alto según la última revisión.
</inputs>

Para cada persona dame: 1) Síntesis equilibrada en 2-3 frases, 2) Dónde coinciden las fuentes y dónde se contradicen, 3) Preguntas abiertas que conviene resolver en la sesión de calibración.`,
                tip: "Puedes copiar y pegar los inputs directamente desde tus notas o tu export. Claude entiende texto plano y tablas. Recuerda anonimizar (Persona_01, etc.) antes de pegar."
            },
            {
                title: "Prepara una narrativa equilibrada desde los feedbacks reales",
                text: "Para la sesión necesitas resumir cada caso en pocas frases que se sostengan en hechos. Pide a Claude que, a partir de los inputs reales que ya consolidaste, redacte una narrativa equilibrada por persona — basada en lo que dicen las fuentes, sin inventar ni adornar. Tiene que sonar a ti y apoyarse en hechos observables.",
                code: `A partir de los inputs consolidados anteriores, ayúdame a redactar una narrativa de calibración para la sesión de Talent Review. Para cada persona, 2-3 frases que pueda usar al presentar el caso al Talent Lead.

Reglas:
- Básate solo en los inputs que te he dado; no inventes logros ni datos.
- Tono directo, concreto y orientado a hechos (impacto en proyecto, comportamientos observables).
- Evita frases vacías como "tiene mucho potencial" sin respaldo en los inputs.
- Si para una persona los inputs son contradictorios o insuficientes, dilo explícitamente en lugar de forzar una conclusión.

Personas: Persona_01, Persona_02, Persona_03.`,
            },
            {
                title: "Anticipa las preguntas de la sesión",
                text: "Antes de entrar a la sesión, pide a Claude que juegue al abogado del diablo: que te lance las preguntas difíciles que pueden surgir del Talent Lead o de un People Lead escéptico sobre cada caso, para que llegues con las respuestas pensadas.",
                code: `Voy a presentar estos casos en una sesión de Talent Review con el Talent Lead, que tiende a cuestionar las valoraciones cuando hay contradicciones entre fuentes.

Simula ser ese Talent Lead y hazme las 5 preguntas más incómodas o críticas que podría lanzarme sobre estos tres casos, teniendo en cuenta las contradicciones entre el input de cliente, el del People Lead/mentor y los KPIs de HR.

Para cada pregunta, dame también la respuesta que yo debería dar, apoyada en los inputs disponibles y reconociendo con honestidad lo que todavía no sé.`,
                tip: "Haz este ejercicio en voz alta. Lee las preguntas como si las estuvieras escuchando de verdad. Así llegas a la sala sin que te pillen desprevenido/a."
            },
            {
                title: "Prepara tu resumen para la sesión",
                text: "Pide a Claude que estructure tu síntesis en un documento de apoyo para la sesión: agenda, resumen por persona, contradicciones a resolver y preguntas abiertas. Es tu material de preparación, no una propuesta de decisiones cerradas.",
                code: `Crea el esqueleto de un documento de apoyo para una sesión de Talent Review. Contexto:
- Audiencia: Talent Lead y People Leads de la practice de Software Engineering
- Duración de la sesión: 90 minutos
- Casos a revisar: 3 personas (síntesis por persona ya preparada)
- Objetivo: alinear visiones a partir de los inputs de cliente, People Lead/mentor y KPIs de HR, y definir preguntas y acciones a validar

Para cada sección dame: título, qué información va en ella y el mensaje clave. No me des diseño ni decisiones cerradas: el documento es para facilitar la conversación, no para sustituirla.`,
            }
        ]
    },
    {
        id: 2,
        icon: "&#128200;",
        title: "Diseñar un plan de acción de Engagement",
        desc: "Convierte los resultados de la encuesta de engagement en un plan de acción concreto con Claude: identifica patrones, prioriza iniciativas y redacta la comunicación al equipo.",
        difficulty: "medium",
        time: "12 min",
        steps: [
            {
                title: "Pega los resultados y pide un diagnóstico",
                text: "Copia los scores de tu encuesta de engagement (pueden ser los de Glint, Qualtrics o cualquier herramienta interna) y pide a Claude que identifique los patrones más relevantes antes de que tú los interpretes.",
                code: `Eres un experto en People Analytics y engagement organizacional. Analiza los siguientes resultados de nuestra encuesta de engagement para la practice de Software & Platform Engineering (N=45, tasa de respuesta: 78%):

SCORES GLOBALES (escala 1-10):
- Engagement índice global: 6.8 (-0.4 vs año anterior)
- Orgullo de pertenencia: 7.9
- Recomendaría Accenture como lugar para trabajar: 6.2
- Satisfacción con oportunidades de desarrollo: 5.4
- Claridad sobre mi carrera profesional: 5.1
- Reconocimiento por mi trabajo: 5.8
- Confianza en el liderazgo: 6.9
- Carga de trabajo sostenible: 5.0
- Colaboración en el equipo: 7.5

DESGLOSE POR SEGMENTO:
- Analysts/Consultants (N=28): Desarrollo profesional 4.8, Carga de trabajo 4.6
- Managers/Senior Managers (N=17): Desarrollo profesional 6.2, Carga de trabajo 5.6

Identifica: 1) Los 3 puntos de dolor principales con el patrón que los explica, 2) Fortalezas a preservar, 3) El segmento más en riesgo y por qué, 4) Hipótesis sobre causas raíz (no solo describas los datos, interprétalos).`,
                tip: "No tienes que tener todos los datos perfectos. Con los scores principales y el desglose por nivel ya tienes suficiente para un análisis útil."
            },
            {
                title: "Identifica las iniciativas con más impacto",
                text: "Ahora pide a Claude que, basándose en el diagnóstico, proponga iniciativas concretas priorizadas por impacto y viabilidad. Específicas para el contexto de una consultora tecnológica, no genéricas de manual.",
                code: `Basándote en el diagnóstico anterior, propón un plan de acción de engagement para los próximos 6 meses. El contexto es importante:
- Somos una practice de Software & Platform Engineering dentro de Accenture
- Los consultores están mayoritariamente en proyectos de cliente, con poco tiempo en la oficina
- Bench actual: ~12% de la población
- El HRBP tiene capacidad limitada: puede impulsar iniciativas pero necesita que los People Leads las ejecuten
- Presupuesto de iniciativas: moderado (no grandes eventos, sí acciones de alto impacto y bajo coste)

Para cada iniciativa propuesta:
1. Nombre de la iniciativa
2. Problema de engagement que ataca (con referencia al score)
3. Qué tiene que hacer el HRBP vs qué tienen que hacer los People Leads
4. Cómo medir si está funcionando (métrica concreta)
5. Timeline (mes de arranque y frecuencia)

Prioriza por impacto esperado en el segmento Analysts/Consultants, que es el más crítico.`,
            },
            {
                title: "Diseña el plan de acción en formato ejecutivo",
                text: "Pide a Claude que estructure las iniciativas en un formato que puedas presentar directamente al MD de la practice: una tabla con prioridad, responsable, timeline y KPI.",
                code: `Convierte las iniciativas anteriores en una tabla de plan de acción ejecutivo con estas columnas:
- Iniciativa (nombre corto)
- Problema que resuelve (score específico)
- Responsable principal (HRBP / People Lead / MD)
- Fecha de inicio
- Frecuencia o duración
- KPI de seguimiento
- Estado inicial (Pendiente de arrancar)

Después de la tabla, dame un párrafo de "Executive Summary" de máximo 5 líneas que pueda usar como introducción al presentar este plan al liderazgo de la practice. Tono directo, orientado a negocio, sin jerga de RRHH.`,
            },
            {
                title: "Redacta la comunicación al equipo",
                text: "El equipo que respondió la encuesta espera saber qué va a pasar con sus respuestas. Claude te ayuda a redactar un mensaje honesto, concreto y que genere confianza sin prometer lo que no puedes cumplir.",
                code: `Redacta un mensaje de comunicación de resultados de encuesta de engagement para enviar al equipo de Software & Platform Engineering. El mensaje tiene que:

1. Agradecer la participación (78% de respuesta)
2. Compartir los 3 puntos fuertes (sin maquillar, con los scores reales)
3. Reconocer abiertamente los 2-3 puntos de mejora más importantes (desarrollo profesional, carga de trabajo, claridad de carrera)
4. Anunciar que hay un plan de acción en marcha con 3 iniciativas concretas (menciónalas de forma general)
5. Indicar cuándo habrá una próxima actualización de progreso

Tono: cercano, honesto, sin corporativismo. Que suene a que lo escribe una persona real que ha leído los resultados y se los toma en serio. Longitud: máximo 250 palabras. Formato: email o mensaje de Teams.`,
                tip: "Antes de enviarlo, léelo en voz alta. Si suena a plantilla de RRHH, pídele a Claude que lo reescriba con un tono más conversacional."
            }
        ]
    },
    {
        id: 3,
        icon: "&#128203;",
        title: "Preparar un briefing para Leadership",
        desc: "Transforma datos brutos de HR en un briefing ejecutivo de una página: mensajes clave, storytelling con datos y formato listo para presentar a un MD o VP.",
        difficulty: "easy",
        time: "10 min",
        steps: [
            {
                title: "Vuelca tus datos en bruto",
                text: "No necesitas que los datos estén organizados. Copia y pega lo que tengas: métricas de attrition, headcount, bench, open roles, engagement score, hiring pipeline. Claude los convierte en narrativa.",
                code: `Eres un HRBP preparando un briefing mensual para el Managing Director de Software & Platform Engineering EMEA. Tengo los siguientes datos en bruto del mes de mayo:

HEADCOUNT Y MOVIMIENTOS:
- Headcount actual: 312 FTEs (+8 vs mes anterior)
- Incorporaciones mayo: 14 (10 laterales, 4 graduates)
- Bajas voluntarias mayo: 6 (attrition mensual: 1.9%)
- Attrition YTD: 11.2% (benchmark Accenture España: 13.5%)
- Bench actual: 34 personas (10.9%), objetivo máximo 8%

TALENT Y DESARROLLO:
- Promociones confirmadas Q2: 7 personas (3 a Manager, 3 a Senior Analyst, 1 a Senior Manager)
- Personas en PIP activo: 2
- Open roles con JD aprobada: 5 (3 seniors, 2 consultants)
- Ofertas en proceso: 3 candidatos en fase final

ENGAGEMENT Y CLIMA:
- Último eNPS (abril): +12 (subió 4 puntos vs enero)
- Escalaciones de clima recibidas en mayo: 1 (resuelta)

Convierte estos datos en un briefing ejecutivo de una página con: 1) Titular que resuma el estado del mes, 2) 3-4 mensajes clave con los datos más relevantes, 3) Un punto de atención que el MD debe conocer, 4) Próximos pasos o decisiones que necesito del liderazgo.`,
                tip: "El bench por encima del objetivo es siempre un punto de atención prioritario para el liderazgo. Destácalo con contexto: cuánto tiempo llevan en bench, qué perfiles son."
            },
            {
                title: "Construye el storytelling con los datos",
                text: "Los datos solos no convencen. Pide a Claude que transforme el briefing en una narrativa con hilo conductor, que conecte los puntos y ayude al liderazgo a entender el contexto, no solo los números.",
                code: `Reescribe el briefing anterior con un enfoque de storytelling para liderazgo ejecutivo. El objetivo no es listar métricas, sino que el MD entienda en 2 minutos de lectura:

1. Cómo estamos respecto a donde deberíamos estar (tendencia, no foto puntual)
2. Cuál es el único número más importante de este mes y por qué
3. Qué decisión o conversación necesita el MD en los próximos 15 días
4. Qué está haciendo el equipo de People para resolver el punto de atención principal (bench)

Formato: máximo 300 palabras, párrafos cortos, un subtítulo por sección. Que pueda leerse en el móvil entre reuniones.`,
            },
            {
                title: "Adapta el formato a un one-pager visual",
                text: "Pide a Claude que te dé la estructura del one-pager en un formato que puedas copiar directamente a una slide de PowerPoint o a un email con tablas simples. Sin diseño, solo estructura clara.",
                code: `Convierte el briefing en un one-pager estructurado para slide de PowerPoint o email ejecutivo. Usa este formato:

TÍTULO DE LA SLIDE: [propón uno impactante]

BLOQUE 1 - HEADLINE DEL MES (1 frase)
[El mensaje más importante del mes en máximo 15 palabras]

BLOQUE 2 - MÉTRICAS CLAVE (tabla de 3 columnas: Métrica | Valor actual | Tendencia ↑↓)
[Las 5-6 métricas más relevantes]

BLOQUE 3 - PUNTO DE ATENCIÓN (1 párrafo corto)
[El tema que necesita acción del MD]

BLOQUE 4 - PRÓXIMOS PASOS (lista de 3 bullets)
[Acciones concretas con responsable y fecha]

NOTA AL PIE: Datos a cierre de mayo 2025 | Fuente: HRBP Software & Platform Engineering`,
                tip: "Los MDs leen el titular y el bloque de atención. Si esos dos bloques no son claros, el resto no importa. Invierte tiempo en esos dos."
            }
        ]
    },
    {
        id: 4,
        icon: "&#128172;",
        title: "Gestionar una conversación difícil",
        desc: "Prepara con Claude cualquier conversación comprometida: problema de desempeño, cambio de rol, conflicto en el equipo. Script, reacciones anticipadas y respuestas empáticas listas.",
        difficulty: "medium",
        time: "12 min",
        steps: [
            {
                title: "Define el contexto de la conversación",
                text: "Cuéntale a Claude quién es la persona, cuál es la situación y cuál es tu objetivo concreto para la conversación. Cuanto más específico seas, más útil será la preparación.",
                code: `Voy a tener una conversación difícil con una persona de mi población y necesito prepararla. Contexto:

PERSONA: Alejandro Méndez, Manager con 4 años en Accenture, practice de Software Engineering.
SITUACIÓN: Ha recibido dos feedbacks negativos consecutivos de cliente en el mismo proyecto. El proyecto manager me ha escalado que Alejandro no está cumpliendo con los tiempos de entrega y que tiene dificultades para gestionar las expectativas del cliente. En el último Talent Review quedó en el cuadrante "Meets / Medium Potential".
MI OBJETIVO: Que Alejandro entienda la gravedad de la situación sin que se ponga a la defensiva, que llegue al final de la conversación con un plan de mejora concreto acordado, y que yo tenga documentado el acuerdo por escrito.
MI PREOCUPACIÓN: Alejandro tiende a justificarse mucho y a externalizar la responsabilidad. Ya tuvimos una conversación de feedback hace 3 meses y no hubo cambio.

Prepárame: 1) Los 3 mensajes clave que tengo que transmitir sí o sí en esta conversación, 2) La apertura de la conversación (primeras 3-4 frases), 3) Cómo estructuro los 30 minutos de la reunión.`,
            },
            {
                title: "Genera el script de la conversación",
                text: "Pide a Claude que redacte el flujo completo de la conversación: apertura, desarrollo, momento de propuesta del plan de mejora y cierre. Con frases literales que puedas adaptar a tu estilo.",
                code: `Redacta el script completo de la conversación con Alejandro. Necesito frases literales (no paráfrasis) para cada fase. El tono tiene que ser firme pero respetuoso, directo sin ser agresivo, empático pero sin ambigüedad sobre la gravedad.

FASE 1 - APERTURA (cómo empiezo, cómo encuadro la conversación)
FASE 2 - PRESENTACIÓN DE HECHOS (cómo presento el feedback del cliente y la escalación sin que suene a juicio)
FASE 3 - ESCUCHA (qué preguntas abiertas hago para entender su perspectiva antes de proponer nada)
FASE 4 - PROPUESTA DE PLAN DE MEJORA (cómo introduzco el PIP o acuerdo de mejora de forma que no sea una sorpresa)
FASE 5 - CIERRE (cómo cierro la reunión con compromisos claros y próximos pasos)

Para cada fase: frases de ejemplo + lo que NO debo decir (errores comunes que escalan la tensión).`,
                tip: "Practica el script en voz alta antes de la reunión. Las primeras 60 segundos son las que más importan: si la apertura es segura y clara, el resto fluye mejor."
            },
            {
                title: "Anticipa las reacciones y prepara respuestas",
                text: "Claude te ayuda a prepararte para las respuestas más difíciles: negación, enfado, llanto, contra-ataque al cliente o al jefe de proyecto. Para cada reacción, una respuesta empática y que mantenga el objetivo de la conversación.",
                code: `Alejandro puede reaccionar de varias formas a esta conversación. Para cada una de las siguientes reacciones, dame la respuesta exacta que yo debería dar, manteniendo el control de la conversación y sin perder la empatía:

1. "Esto no es culpa mía, el cliente siempre cambia los requisitos a última hora."
2. "Nunca me habían dicho que había un problema. ¿Por qué no me lo dijeron antes?"
3. "Esto me parece injusto. Otros Managers hacen lo mismo y no les pasa nada."
4. [Se queda en silencio y parece emocionalmente afectado / al borde del llanto]
5. "Si esto es un PIP, prefiero hablar directamente con Legal."
6. "Vale, haré lo que me pidáis, pero que conste que no estoy de acuerdo."

Para cada reacción: 2-3 frases de respuesta + el objetivo que persigo con esa respuesta.`,
            },
            {
                title: "Documenta el acuerdo post-conversación",
                text: "Después de la conversación, pide a Claude que te ayude a redactar el resumen escrito que enviarás a Alejandro por email (o que quedará en el expediente). Claro, factual y sin ambigüedades.",
                code: `La conversación con Alejandro ha ido razonablemente bien. Ha reconocido parcialmente las dificultades y hemos acordado lo siguiente:
- Reunión bisemanal de seguimiento conmigo durante 3 meses
- Formación en gestión de expectativas de cliente (curso interno de Accenture) antes de fin de mes
- Objetivo específico: que el Project Manager del proyecto actual confirme por escrito al final de cada sprint que los entregables se han cumplido en tiempo
- Revisión formal en 6 semanas: si no hay mejora observable, se iniciará proceso formal

Redacta el email de seguimiento que le envío a Alejandro hoy mismo resumiendo lo acordado. Tono: profesional y directo. Que quede claro qué se comprometió a hacer y en qué plazos. Que yo pueda usar este email como respaldo documental si hay que escalar más adelante.`,
            }
        ]
    },
    {
        id: 5,
        icon: "&#128202;",
        title: "Analizar datos de rotación para presentar a un Lead",
        desc: "Pega tus datos de attrition en Claude, obtén el análisis con las palancas clave, construye la narrativa y llega a la reunión con el People Lead con conclusiones y recomendaciones listas.",
        difficulty: "medium",
        time: "15 min",
        steps: [
            {
                title: "Pega los datos de rotación y pide el análisis",
                text: "Copia tu tabla de bajas del trimestre (o del año) y pide a Claude que identifique los patrones que tú podrías estar pasando por alto: por nivel, por tiempo en la empresa, por capability, por mes.",
                code: `Analiza los siguientes datos de attrition voluntario de la practice de Software & Platform Engineering para el primer semestre del año. Identifica patrones, anomalías y palancas causales.

BAJAS VOLUNTARIAS H1 (18 personas sobre una población de 295 FTEs):

Nombre | Nivel | Meses en Accenture | Capability | Mes de baja | Destino conocido
--------|-------|-------------------|------------|-------------|------------------
Sofía Herrera | Senior Analyst | 18 | Cloud & Infra | Enero | Startup fintech
Miguel Castro | Consultant | 8 | DevSecOps | Enero | Competencia directa
Raquel Vidal | Manager | 36 | Java Backend | Febrero | Banca (cliente)
Tomás Iglesias | Senior Analyst | 22 | Cloud & Infra | Febrero | Startup
Beatriz Moreno | Analyst | 6 | QA Automation | Marzo | Otra consultora
Diego Serrano | Senior Manager | 61 | Java Backend | Marzo | Director en empresa producto
Cristina Blanco | Consultant | 14 | DevSecOps | Abril | Startup
Álvaro Peña | Senior Analyst | 19 | Cloud & Infra | Abril | Competencia
Nuria Cano | Manager | 42 | QA Automation | Abril | Banca (cliente)
Roberto Jiménez | Analyst | 5 | DevSecOps | Mayo | Otra consultora
Irene Santos | Senior Analyst | 17 | Cloud & Infra | Mayo | Startup
Fernando Gil | Consultant | 11 | Java Backend | Mayo | Competencia directa
Patricia Ramos | Manager | 28 | Cloud & Infra | Junio | Cliente directo
Luis Molina | Senior Analyst | 21 | Cloud & Infra | Junio | Startup fintech
Carmen Reyes | Analyst | 4 | QA Automation | Junio | Otra consultora
Andrés Muñoz | Consultant | 9 | DevSecOps | Junio | Competencia directa
Isabel Vargas | Senior Analyst | 23 | Cloud & Infra | Junio | Cliente directo
Marcos Delgado | Manager | 33 | Java Backend | Junio | Empresa producto

Las tasas globales de attrition ya me las da Workday; no las recalcules. Céntrate en los patrones de quién se va y por qué.

Análisis solicitado:
1. Concentración de bajas por capability (¿dónde se acumulan y qué peso tiene cada una?)
2. Distribución por nivel (¿qué nivel pierde más?)
3. Tiempo en empresa de los que se van (¿en qué ventana temporal se produce el mayor riesgo?)
4. Principales destinos (¿a dónde nos van? ¿startup, competencia, cliente?)
5. Meses de mayor concentración de bajas y posible estacionalidad
6. Top 3 hipótesis sobre causas raíz basadas en los datos`,
                tip: "Cloud & Infra concentra muchas bajas. Ese patrón vale más que el número global. El People Lead necesita el dato segmentado, no solo el porcentaje."
            },
            {
                title: "Construye la narrativa para el People Lead",
                text: "Con el análisis en mano, pide a Claude que construya la historia que contarás al People Lead: no una lista de datos, sino un relato con causa, consecuencia y propuesta de acción.",
                code: `Basándote en el análisis anterior, construye la narrativa que presentaré al People Lead de Software & Platform Engineering en una reunión de 20 minutos. El People Lead es un MD con mentalidad de negocio: necesita entender el impacto, no la descripción.

La narrativa debe seguir esta estructura:
1. LA FOTO: Dónde estamos vs benchmark y vs año anterior (attrition H1: 12.2%, benchmark sector tech España: ~15%, nuestro H1 año anterior: 9.8%)
2. EL PATRÓN: El dato más relevante que no es obvio a primera vista (no solo "tenemos rotación", sino "el problema está concentrado en X con Y perfil a los Z meses")
3. EL RIESGO: Si no hacemos nada, qué ocurre en H2 (proyección concreta)
4. LAS PALANCAS: Las 2-3 acciones que podríamos activar con mayor impacto en los próximos 90 días
5. LO QUE NECESITO DEL PEOPLE LEAD: Una o dos decisiones o compromisos concretos que necesito que salgan de esa reunión

Tono ejecutivo, directo. Sin jerga de RRHH. Máximo 400 palabras.`,
            },
            {
                title: "Prepara las preguntas que te va a hacer",
                text: "El People Lead va a preguntar. Pide a Claude que te prepare para las preguntas más frecuentes y más incómodas que puede lanzarte sobre los datos de rotación.",
                code: `El People Lead con el que voy a reunirme suele hacer preguntas muy directas y a veces cuestionadoras. Prepárame para estas preguntas sobre el attrition de H1:

1. "¿Estamos peor que la competencia o es un problema del sector?"
2. "¿Esto es culpa de los People Leads que no están gestionando bien a su gente?"
3. "¿Por qué no detectamos antes que Cloud & Infra estaba en riesgo?"
4. "¿Cuánto nos está costando esto en términos de recruiting y onboarding?"
5. "¿Qué diferencia a los que se quedan de los que se van?"
6. "¿Qué están haciendo otras practices que nosotros no estemos haciendo?"

Para cada pregunta: la respuesta que daré con los datos que tengo + lo que admito que no sé todavía (honestidad sobre gaps de información genera más confianza que pretender tener todas las respuestas).`,
            },
            {
                title: "Genera sugerencias de visualización",
                text: "Pide a Claude que te recomiende los gráficos más impactantes para ilustrar los patrones de attrition, y cómo describir cada visualización para incluirla en tu presentación o en un email de seguimiento.",
                code: `Para presentar estos datos de attrition de forma visual e impactante al liderazgo, recomiéndame:

1. Los 4 gráficos más útiles para contar esta historia (tipo de gráfico + qué datos representa + por qué ese tipo es el más adecuado)
2. Para cada gráfico: el título que usarías y el mensaje clave que debe transmitir (la conclusión que quiero que el espectador saque al verlo)
3. El orden en que presentaría los gráficos para construir la narrativa de forma progresiva

No necesito código. Solo la descripción de cada visual que pueda reproducir en Excel, PowerPoint o Google Sheets con los datos que ya tengo.`,
                tip: "El gráfico de attrition por capability + tiempo en empresa suele ser el más revelador. Si puedes cruzar esas dos variables, tendrás el insight más accionable."
            }
        ]
    },
    {
        id: 6,
        icon: "&#128187;",
        title: "Crear una presentación HTML de resultados",
        desc: "Usa Claude para generar una presentación HTML completa con transiciones, lista para un People Review o resultados trimestrales de HR. Personalízala y expórtala a PDF.",
        difficulty: "hard",
        time: "20 min",
        steps: [
            {
                title: "Define el contenido y pide el HTML completo",
                text: "Proporciona a Claude el contenido que quieres en la presentación: métricas, mensajes clave, estructura de slides. Claude generará el HTML completo con estilos y transiciones que puedes abrir directamente en el navegador.",
                code: `Genera una presentación HTML completa (un único archivo .html autocontenido) para un People Review trimestral de la practice de Software & Platform Engineering en Accenture. La presentación debe tener:

REQUISITOS TÉCNICOS:
- Navegación por teclado (flechas) y botones de siguiente/anterior
- Transiciones suaves entre slides (fade o slide)
- Diseño profesional con paleta de colores corporativa (púrpura Accenture #A100FF, negro, blanco, gris oscuro)
- Logo de Accenture en texto (no imagen) en todas las slides
- Número de slide visible
- Compatible con Chrome para exportar a PDF

CONTENIDO (8 slides):

Slide 1 - PORTADA
Título: "People Review Q2 2025"
Subtítulo: "Software & Platform Engineering EMEA"
Fecha: Julio 2025
Presentado por: People Lead & HRBP Team

Slide 2 - HEADLINE DEL TRIMESTRE
Mensaje principal: "Attrition controlado, bench en zona de atención, engagement en recuperación"
3 KPIs destacados: Attrition YTD 11.2% ✓ | Bench 10.9% ⚠ | eNPS +12 ↑

Slide 3 - HEADCOUNT & MOVIMIENTOS
Tabla: Headcount inicio Q2: 304 | Incorporaciones: 31 | Bajas: 18 | Headcount fin Q2: 317
Gráfico de texto: evolución mensual (Abril 304, Mayo 309, Junio 317)

Slide 4 - ATTRITION DEEP DIVE
Attrition voluntario H1: 18 personas (12.2%)
Top 3 capabilities afectadas: Cloud & Infra (7), DevSecOps (5), QA Automation (3)
Perfil predominante: Senior Analyst, 15-24 meses en empresa
Destinos: 39% startups, 28% competencia, 22% cliente directo, 11% otra consultora

Slide 5 - TALENT & CALIBRACIÓN
Resultados Q2 Talent Review: 6 Stars identificados, 3 Under Performers con plan activo
Promociones confirmadas: 7 (3 a Manager, 3 a Senior Analyst, 1 a Senior Manager)
Pipeline de sucesión Senior Manager→MD: 2 candidatos en aceleración

Slide 6 - ENGAGEMENT & CLIMA
eNPS abril: +12 (subió +4 desde enero)
Top fortalezas: Orgullo de pertenencia 7.9, Colaboración 7.5
Áreas de mejora prioritarias: Claridad de carrera 5.1, Carga de trabajo 5.0
Plan de acción activado: 3 iniciativas en marcha desde mayo

Slide 7 - FOCO H2: BENCH & STAFFING
Bench actual: 34 personas (10.9%) — objetivo máximo 8%
Top perfiles en bench: Java Backend Senior (8), Cloud Architect (5), QA Lead (4)
Acciones en curso: 5 posiciones abiertas, 3 ofertas en proceso, 2 proyectos en pipeline
Previsión: reducción a 8.5% en 6 semanas si se cierran las posiciones en curso

Slide 8 - DECISIONES REQUERIDAS
3 bullets con decisiones que necesita tomar el liderazgo:
1. Aprobar presupuesto formación Cloud & Infra para retención (€12K)
2. Confirmar política de movilidad interna para perfiles en bench >60 días
3. Autorizar proceso de incorporación para 2 perfiles senior adicionales en Cloud

Genera el HTML completo y funcional. Incluye todos los estilos en el propio archivo (no dependencias externas).`,
                tip: "Abre el HTML en Chrome. Para exportar a PDF: Ctrl+P > Guardar como PDF > en 'Más opciones' activa 'Gráficos de fondo'. Obtendrás un PDF de alta calidad slide a slide."
            },
            {
                title: "Personaliza el diseño y los contenidos",
                text: "Una vez tengas el HTML base, pide a Claude que ajuste el diseño o añada elementos específicos: un gráfico de barras en texto, una tabla comparativa, un semáforo de métricas. Todo en HTML puro sin librerías externas.",
                code: `Tengo el HTML de la presentación generado. Necesito que hagas estos ajustes:

1. En la slide de Attrition Deep Dive (slide 4), añade una representación visual de barras usando caracteres HTML y CSS puro (sin librerías) que muestre las 3 capabilities con más attrition. Las barras deben ser proporcionales a los números reales.

2. En la slide de Engagement (slide 6), añade un semáforo visual (círculos de colores rojo/amarillo/verde) para cada métrica:
   - Verde (≥7): Orgullo de pertenencia (7.9), Colaboración (7.5)
   - Amarillo (5-6.9): eNPS global (6.8), Reconocimiento (5.8), Carga de trabajo (5.0)
   - Rojo (<5): Claridad de carrera (5.1) — en el límite, ponla en amarillo/rojo

3. En la slide de Decisiones Requeridas (slide 8), añade un campo de estado para cada decisión (Pendiente / En revisión / Aprobada) que sea visualmente destacado con colores.

4. Cambia el color de acento secundario de toda la presentación: en lugar de gris, usa un azul marino oscuro (#003087) para los subtítulos y elementos secundarios.

Dame el HTML completo actualizado con todos estos cambios integrados.`,
            },
            {
                title: "Añade un modo de presentación y notas del presentador",
                text: "Pide a Claude que añada notas del presentador visibles solo en modo edición (no en la proyección) y un modo de presentación a pantalla completa con la tecla F.",
                code: `Añade las siguientes funcionalidades al HTML de la presentación:

1. NOTAS DEL PRESENTADOR: Debajo de cada slide (visible solo cuando NO está en modo fullscreen), añade un campo de notas en gris claro con las claves que debo recordar al presentar esa slide. Para la slide de Attrition, la nota sería: "Destacar que Cloud & Infra es el hot spot. El People Lead ya lo sabe pero necesita verlo cuantificado. Anticipar la pregunta sobre por qué no se detectó antes."

2. MODO PRESENTACIÓN: Al pulsar la tecla "F" o hacer clic en un botón "Presentar", que entre en fullscreen y oculte las notas y los controles de navegación excepto las flechas del teclado.

3. BARRA DE PROGRESO: Una barra fina en la parte inferior que muestre el avance por las slides (de izquierda a derecha según el progreso).

4. CONTADOR DE TIEMPO: Un pequeño temporizador en la esquina superior derecha que arranque al entrar en modo presentación y que pueda pausarse con la tecla "P". Útil para no pasarse del tiempo asignado.

Dame el HTML completo con estas mejoras integradas.`,
                tip: "Para la exportación a PDF definitiva, entra en modo presentación (F), luego Ctrl+P desde Chrome. Las notas del presentador no aparecerán en el PDF porque están ocultas en fullscreen."
            },
            {
                title: "Exporta a PDF y prepara la versión para compartir",
                text: "El HTML también puede convertirse en una versión para compartir por email o Teams. Pide a Claude que genere una versión simplificada en HTML estático (sin transiciones) optimizada para lectura individual, no para proyección.",
                code: `Crea una segunda versión del mismo contenido pero en formato de documento HTML para leer (no para proyectar). Esta versión será la que envíe por email o comparta en Teams para que el liderazgo pueda leerla antes de la reunión.

Requisitos de esta versión "lectura":
- Layout vertical (scroll), no slides
- Todas las secciones visibles sin navegar
- Cada sección con su título destacado
- Las métricas en formato tabla o lista estructurada
- Los semáforos de colores de la slide de Engagement mantenidos
- Sin animaciones ni transiciones
- Un banner de cabecera con título, fecha y "Confidencial - Solo uso interno"
- Optimizado para impresión / exportación a PDF en A4 vertical
- Al final, un espacio de "Comentarios y preguntas" con los 3 bullet points de decisiones requeridas destacados en una caja de color

El resultado debe ser un único archivo HTML que se vea bien en cualquier navegador y que al hacer Ctrl+P quede perfectamente paginado en A4.`,
            }
        ]
    }
];
