
function HomePage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br to-gray-800 text-white">
      <div className="max-w-4xl p-10 rounded-lg bg-zinc-800 shadow-lg">
        <h1 className="text-4xl h1-form text-center mb-6 text-blue-400">
          Bienvenido a tu Gestor de Tareas
        </h1>
        <p className="text-lg text-gray-300 tasks text-center mb-8">
          Este sistema te permite organizar y gestionar tus tareas de manera
          eficiente, manteniéndote enfocado en lo que realmente importa.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 bg-zinc-700 rounded-md shadow hover:shadow-lg transition transform hover:scale-105">
            <h2 className="text-2xl h1-form text-blue-300 mb-3">
              Planifica tus tareas
            </h2>
            <p className="text-gray-400 tasks">
              Organiza tus objetivos diarios, semanales o mensuales con nuestro
              sistema avanzado de planificación.
            </p>
          </div>
          <div className="p-6 bg-zinc-700 rounded-md shadow hover:shadow-lg transition transform hover:scale-105">
            <h2 className="text-2xl h1-form text-blue-300 mb-3">
              Monitorea tu progreso
            </h2>
            <p className="text-gray-400 tasks">
              Revisa cómo avanzas en tus tareas y mantente al tanto de tus metas
              en tiempo real.
            </p>
          </div>
          <div className="p-6 bg-zinc-700 rounded-md shadow hover:shadow-lg transition transform hover:scale-105">
            <h2 className="text-2xl h1-form text-blue-300 mb-3">
              Prioriza lo importante
            </h2>
            <p className="text-gray-400 tasks">
              Asigna prioridades a tus tareas y enfócate en lo que realmente
              importa para ti.
            </p>
          </div>
          <div className="p-6 bg-zinc-700 rounded-md shadow hover:shadow-lg transition transform hover:scale-105">
            <h2 className="text-2xl h1-form text-blue-300 mb-3">
              Organiza tu tiempo
            </h2>
            <p className="text-gray-400 tasks">
              Aprovecha tu tiempo de manera efectiva con herramientas de
              organización integradas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
