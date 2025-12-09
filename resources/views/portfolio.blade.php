<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio</title>
    @vite(['resources/css/app.css', 'resources/css/portfolio.css', 'resources/js/app.js'])
</head>
<body class="min-h-screen relative" style="background-color: #000000;">
    <!-- Animated Blue Circles Background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
        <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div class="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    <div class="container mx-auto px-4 py-16 relative z-10 min-h-screen flex items-center justify-center">
        <div class="max-w-4xl mx-auto text-center">
            <!-- Header Section -->
            <div class="mb-16 animate-fade-in">
                <h1 class="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl">
                    Welkom bij mijn Portfolio
                </h1>
                <p class="text-xl md:text-2xl text-gray-300 mb-4">
                    Hallo, ik ben Yasin - Software Developer Student.
                </p>
                <p class="text-lg text-gray-400 max-w-2xl mx-auto">
                    Verken mijn projecten en zie waaraan ik heb gewerkt. Kies een van de opties hieronder om te beginnen.
                </p>
            </div>

            <!-- Buttons Section -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <!-- Button to LetsQuiz Homepage -->
                <x-portfolio-button href="{{ route('home') }}" color="blue" description="Een interactieve quiz applicatie gemaakt met laravel" madeFor="School groepsproject 1 - consortiumberoepsonderwijs">
                    🤔 LetsQuiz
                </x-portfolio-button>

                <!-- Button to External Site 1 -->
                <x-portfolio-button href="https://halalmf.itch.io/big-randy" color="orange" :external="true" description="Een unity horror spel waar je uit Big Randy's huis moet ontsnappen" password="1234" madeFor="School project 2">
                    👻 Big Randy
                </x-portfolio-button>

                <x-portfolio-button href="https://halalmf.itch.io/reality-check" color="green" :external="true" description="Een unity spel waar je deepfake moet kunnen herkennen" password="1234" madeFor="Hackathon Aventus">
                    🤖 Reality Check
                </x-portfolio-button>

                <x-portfolio-button href="https://github.com/Deropiee" color="purple" :external="true" description="Mijn code repositories, school contributies zijn niet zichtbaar😞">
                    💻 Mijn GitHub
                </x-portfolio-button>

            </div>

            <!-- Footer Info -->
            <div class="mt-16 text-gray-400 text-sm">
            </div>
        </div>
    </div>
</body>
</html>
