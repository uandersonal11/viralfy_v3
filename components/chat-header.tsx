'use client';

export function ChatHeader() {
  return (
    <div className="flex flex-col items-start space-y-2">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        Velaris <span className="text-2xl">👑</span>
      </h1>
      <p className="text-gray-600">
        Receba ajuda personalizada e acelere sua criação de conteúdo.
      </p>
    </div>
  );
}