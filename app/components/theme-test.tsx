export default function ThemeTest() {
    return (
        <div className="p-4 rounded-lg border border-neutral-200 [.dark_&]:border-neutral-700 bg-neutral-50 [.dark_&]:bg-neutral-900">
            <h3 className="text-lg font-semibold text-neutral-900 [.dark_&]:text-neutral-100 mb-2">
                Teste do Modo Escuro/Claro
            </h3>
            <p className="text-neutral-600 [.dark_&]:text-neutral-400 mb-2">
                Este é um exemplo de como o conteúdo aparece nos diferentes modos.
            </p>
            <div className="flex gap-2">
                <span className="px-2 py-1 bg-blue-100 [.dark_&]:bg-blue-900 text-blue-800 [.dark_&]:text-blue-200 rounded text-sm">
                    Azul
                </span>
                <span className="px-2 py-1 bg-green-100 [.dark_&]:bg-green-900 text-green-800 [.dark_&]:text-green-200 rounded text-sm">
                    Verde
                </span>
                <span className="px-2 py-1 bg-purple-100 [.dark_&]:bg-purple-900 text-purple-800 [.dark_&]:text-purple-200 rounded text-sm">
                    Roxo
                </span>
            </div>
        </div>
    )
}
