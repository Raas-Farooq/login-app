
function Home(){
    return(
        <div className="w-screen">
            {/* Hero Banner */}
            <div className="relative w-full h-96 md:h-screen bg-cover bg-center overflow-hidden" style={{backgroundImage: 'url(/images/ramzan-kareem.jpg)'}}>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-700/50 to-yellow-700/50"></div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">Ramzan Kareem Mubarak</h1>
                    <p className="text-lg md:text-2xl text-white mb-8 drop-shadow-md max-w-2xl">Welcoming the blessed month with peace, prosperity, and spirituality</p>
                    <a href="#features" className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:translate-y-0 drop-shadow-lg cursor-pointer inline-block">
                        Learn More
                    </a>
                </div>
            </div>

            {/* Secondary Section */}
        </div>
    )
}

export default Home
