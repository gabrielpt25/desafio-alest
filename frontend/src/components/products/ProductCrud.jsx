/* eslint-disable react/no-typos */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-expressions */
import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'



const headerProps = {
    icon: 'product-hunt',
    title: 'Produtos',

}

const baseUrl = 'http://localhost:3001/product'
const initialState = {
    product: { name: '', price: ''},
    list: []
}

export default class ProductCrud extends Component {

    state = { ...initialState }
    
    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data})
        })
    }

    clear() {
        this.setState({ product: initialState.product })
    }

    save() {
        const product = this.state.product
        const method = product.id ? 'put' : 'post'
        const url = product.id ? `${baseUrl}/${product.id}` : baseUrl
        axios[method](url, product)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                {/*Persiste a informação, retornado os dados. */ }
                this.setState({ product: initialState.product, list })
            })
    }

    getUpdatedList(product) {
        const list = this.state.list.filter(p => p.id !== product.id)
        list.unshift(product)
        return list

    }

    updateField(event) {
        const product = { ...this.state.product }
        product[event.target.name] = event.target.value
        this.setState({ product })
        {/*pra não alterar o objeto direto ele faz uma copia e depois ele faz um put pra alterar o objeto*/ }

    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6"> 
                        <div className="form-group">
                            <label>Nome Produto</label>
                            <input type="text" className="form-control" 
                                name="name"
                                value={this.state.product.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Informe o nome" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                            <div className="form-group">
                            <label>Preço</label>
                            <input type="text" className="form-control" 
                                name="price"
                                value={this.state.product.price}
                                onChange={e => this.updateField(e)}
                                placeholder="Informe o preço" />
                        </div>

                    </div>

                </div>

                <hr />

                <div className="cold-12 d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={e => this.save(e)}>
                        Salvar
                    </button>
                    <button className="btn btn-Secundary ml-4" onClick={e => this.clear(e)}>
                        Cancelar
                    </button>
                </div>

            </div>
        )

    }

    load(product) {

        this.setState({ product })

    }

    remove(product) {

        axios.delete(`${baseUrl}/${product.id}`).then (resp => {
            const list = this.state.list.filter(u => u !== product)
            this.setState({ list })
        })

    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Produto</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        return this.state.list.map(product => {
            return (
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td> 
                        <button className="btn btn-warning"
                        onClick={() => this.load(product)}>
                            <i className="fa fa-pencil"></i>
                        </button>

                        <button className="btn btn-danger ml-2"
                        onClick={() => this.remove(product)}>
                        <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }

}