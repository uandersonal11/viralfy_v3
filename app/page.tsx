import { Bell, Image as ImageIcon, Mic, FileAudio, Sparkles } from "lucide-react";
import { UsageChart } from "@/components/usage-chart";
import { Header } from "@/components/header";

const stats = [
  {
    title: "Transcrição",
    value: "5",
    icon: FileAudio,
  },
  {
    title: "Roteiro",
    value: "3",
    icon: Sparkles,
  },
  {
    title: "Títulos",
    value: "14",
    icon: FileAudio,
  },
  {
    title: "Temas",
    value: "18",
    icon: ImageIcon,
  },
  {
    title: "Gerar Prompts",
    value: "7",
    icon: Sparkles,
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen pt-4">
      <div className="bg-gray-50 min-h-[calc(100vh-1rem)] rounded-t-[1.5rem]">
        <div className="max-w-[1800px] mx-auto p-8">
          <Header />
          
          <div className="space-y-8 mt-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Limites diários disponíveis</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.title}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-600 font-medium">{stat.title}</span>
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <stat.icon className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-blue-600">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr,280px] gap-8">
              <UsageChart />

              <div className="grid grid-rows-2 gap-4">
                <div className="bg-blue-600 p-6 rounded-xl text-white flex flex-col justify-between hover:shadow-md transition-all duration-200 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Gerar Imagens</span>
                    <div className="p-2 bg-white/10 rounded-lg">
                      <ImageIcon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-5xl font-bold mt-auto">5</div>
                </div>

                <div className="bg-blue-600 p-6 rounded-xl text-white flex flex-col justify-between hover:shadow-md transition-all duration-200 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Narração</span>
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Mic className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-5xl font-bold mt-auto">7</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="px-4 py-1.5 bg-black text-white text-sm rounded-full font-medium">
                    Obtenha a melhor oferta
                  </span>
                  <h2 className="text-2xl font-bold mt-4">
                    Faça o upgrade do seu plano
                  </h2>
                  <p className="text-gray-600 mt-2 max-w-2xl">
                    Transforme seu canal Dark em uma máquina de engajamento com nossas
                    ferramentas e recursos feitos para destacar seus vídeos. Foque na edição,
                    e deixe o resto com a gente!
                  </p>
                </div>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow-md">
                  Ver planos
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group cursor-pointer">
                  <div className="bg-blue-600 p-3 rounded-xl group-hover:scale-110 transition-transform w-fit">
                    <ImageIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mt-3">Imagens Poderosas</h3>
                  <p className="text-sm text-gray-600 mt-1">Gere imagens de alto impacto com IA</p>
                </div>
                <div className="p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group cursor-pointer">
                  <div className="bg-blue-600 p-3 rounded-xl group-hover:scale-110 transition-transform w-fit">
                    <Mic className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mt-3">Narração</h3>
                  <p className="text-sm text-gray-600 mt-1">Dê voz aos seus vídeos</p>
                </div>
                <div className="p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group cursor-pointer">
                  <div className="bg-blue-600 p-3 rounded-xl group-hover:scale-110 transition-transform w-fit">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mt-3">Roteiros</h3>
                  <p className="text-sm text-gray-600 mt-1">Gere roteiros em tempo real com IA</p>
                </div>
                <div className="p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group cursor-pointer">
                  <div className="bg-blue-600 p-3 rounded-xl group-hover:scale-110 transition-transform w-fit">
                    <FileAudio className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mt-3">Transcrição</h3>
                  <p className="text-sm text-gray-600 mt-1">Gere transcrição de vídeos do Youtube/Tiktok</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}