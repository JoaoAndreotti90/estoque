import React, { useState, useEffect } from 'react'
import ProductItem from './components/ProductItem'

function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('estoque_produtos')
    if (saved) {
      return JSON.parse(saved)
    }
    return [
      { id: 1, name: 'Notebook Gamer', quantity: 5, price: 4500 },
      { id: 2, name: 'Monitor 24 Polegadas', quantity: 2, price: 800 },
      { id: 3, name: 'Mouse Sem Fio', quantity: 12, price: 50 },
      { id: 4, name: 'Teclado Mecânico', quantity: 0, price: 250 },
    ]
  })

  const [newProductName, setNewProductName] = useState('')
  const [newProductPrice, setNewProductPrice] = useState('')
  const [newProductQuantity, setNewProductQuantity] = useState('')
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    localStorage.setItem('estoque_produtos', JSON.stringify(products))
  }, [products])

  const updateQuantity = (id, amount) => {
    const newProducts = products.map(product => {
      if (product.id === id) {
        const newQuantity = product.quantity + amount
        if (newQuantity < 0) return product
        return { ...product, quantity: newQuantity }
      }
      return product
    })
    setProducts(newProducts)
  }

  const saveProduct = () => {
    if (newProductName.trim() === '' || newProductPrice === '') return

    const price = Number(newProductPrice)
    const quantity = newProductQuantity === '' ? 0 : Number(newProductQuantity)

    if (editingId) {
      const updatedProducts = products.map(product => {
        if (product.id === editingId) {
          return { ...product, name: newProductName, price: price, quantity: quantity }
        }
        return product
      })
      setProducts(updatedProducts)
      setEditingId(null)
    } else {
      const newProduct = {
        id: Date.now(),
        name: newProductName,
        quantity: quantity,
        price: price
      }
      setProducts([...products, newProduct])
    }

    setNewProductName('')
    setNewProductPrice('')
    setNewProductQuantity('')
  }

  const startEditing = (product) => {
    setEditingId(product.id)
    setNewProductName(product.name)
    setNewProductPrice(product.price)
    setNewProductQuantity(product.quantity)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setNewProductName('')
    setNewProductPrice('')
    setNewProductQuantity('')
  }

  const removeProduct = (id) => {
    const newProducts = products.filter(product => product.id !== id)
    setProducts(newProducts)
  }

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(search.toLowerCase())
  )

  const totalValue = products.reduce((acc, product) => {
    return acc + (product.price * product.quantity)
  }, 0)

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  }

  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">
          Controle de Estoque
        </h1>

        <div className="bg-slate-800 p-6 rounded-xl mb-6 md:mb-8 border border-slate-700 shadow-lg text-center">
          <h2 className="text-gray-400 text-sm uppercase tracking-wider font-semibold">Valor Total em Estoque</h2>
          <p className="text-3xl md:text-4xl font-bold text-green-400 mt-2">
            {formatCurrency(totalValue)}
          </p>
        </div>

        <div className="mb-6">
          <input 
            type="text" 
            placeholder="Buscar produto..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className={`flex flex-col gap-3 mb-8 w-full p-4 rounded-lg border transition-colors ${editingId ? 'bg-blue-900/30 border-blue-500' : 'bg-slate-800 border-slate-700'}`}>
          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="text"
              placeholder="Nome do produto..."
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              className="w-full md:flex-1 bg-slate-900 text-white border border-slate-700 rounded-lg px-4 py-3 md:py-2 outline-none focus:border-blue-500 transition-colors"
            />
            
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Qtd"
                value={newProductQuantity}
                onChange={(e) => setNewProductQuantity(e.target.value)}
                className="w-1/3 md:w-20 bg-slate-900 text-white border border-slate-700 rounded-lg px-2 py-3 md:py-2 outline-none focus:border-blue-500 transition-colors text-center"
              />

              <input
                type="number"
                placeholder="Preço (R$)"
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
                className="flex-1 md:w-32 bg-slate-900 text-white border border-slate-700 rounded-lg px-4 py-3 md:py-2 outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-2">
            <button
              onClick={saveProduct}
              className={`w-full font-bold px-6 py-3 md:py-2 rounded-lg transition-colors mt-2 text-white ${editingId ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}`}
            >
              {editingId ? 'Salvar Alterações' : 'Adicionar Produto'}
            </button>
            
            {editingId && (
              <button
                onClick={cancelEditing}
                className="w-full md:w-auto bg-slate-600 hover:bg-slate-500 text-white font-bold px-6 py-3 md:py-2 rounded-lg transition-colors mt-2"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {filteredProducts.map(product => (
            <ProductItem 
              key={product.id}
              product={product}
              onUpdate={updateQuantity}
              onRemove={removeProduct}
              onEdit={startEditing}
              formatCurrency={formatCurrency}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App