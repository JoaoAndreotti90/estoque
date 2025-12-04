import React from 'react'

function ProductItem({ product, onUpdate, onRemove, onEdit, formatCurrency }) {
  return (
    <div className="bg-slate-800 p-4 md:p-6 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between shadow-lg border border-slate-700 gap-4 md:gap-0">
      
      <div className="w-full md:w-auto">
        <h2 className="text-xl font-semibold text-white">
          {product.name}
        </h2>
        <p className="text-gray-400 text-sm">
          Preço unitário: {formatCurrency(product.price)}
        </p>
        <span className={`text-sm font-bold px-3 py-1 rounded-full mt-2 inline-block ${product.quantity < 5 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
          {product.quantity < 5 ? 'Estoque Baixo' : 'Estoque Normal'}
        </span>
      </div>

      <div className="flex items-center justify-between w-full md:w-auto md:justify-start gap-4">
        
        <div className="flex items-center gap-3">
            <button
            onClick={() => onUpdate(product.id, -1)}
            className="w-10 h-10 flex items-center justify-center bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-bold transition-colors"
            >
            -
            </button>

            <span className="text-2xl font-mono text-white w-8 text-center">
            {product.quantity}
            </span>

            <button
            onClick={() => onUpdate(product.id, 1)}
            className="w-10 h-10 flex items-center justify-center bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-bold transition-colors"
            >
            +
            </button>
        </div>

        <div className="flex gap-2">
            <button
            onClick={() => onEdit(product)}
            className="text-blue-400 hover:text-blue-300 transition-colors p-2 bg-blue-500/10 rounded-lg md:bg-transparent"
            title="Editar Produto"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            </button>

            <button
            onClick={() => onRemove(product.id)}
            className="text-red-400 hover:text-red-300 transition-colors p-2 bg-red-500/10 rounded-lg md:bg-transparent"
            title="Deletar Produto"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            </button>
        </div>
      </div>
    </div>
  )
}

export default ProductItem