import React from 'react';

import Item from "./Item"
import SearchBar from './SearchBar'
import data from "./data/graphic_card.json"
import OrderOption from "./OrderOption"

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            list: data,
            query: "",
            order: {
                field: "id",
                direction: "inc"
            },
        }
        this.orderFields = ["id", "name", "price", "microarchitecture"]
        this.nextId = 7
    }

    addItem = () => {
        const item = {
            id: this.nextId++,
            name: "",
            price: "",
            imgUrl: "",
            rating: 0,
            microarchitecture: "",
            editable: true
        }
        this.setState((prevState) => {
            return {list: prevState.list.concat([item])}
        })
    }

    saveItem = (item) => {
        this.setState((prevState) => {
            return {
                list : prevState.list.map(e => {
                    if(e.id === item.id) {
                        return item
                    }
                    return e
                })
            }
        })
    }

    removeItem = (item) => {
        this.setState((prevState) => {
            return {
                list: prevState.list.filter(e => e.id !== item.id)
            }
        })
    }

    updateStateFromChild = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    compareItems = (a, b) => {
        const {field, direction} = this.state.order
        if(a[field] === b[field]) {
            return 0
        }
        return ((a[field] > b[field]) === (direction === "inc")) ? 1 : -1
    }

    checkItem = (item) => {
        const q = this.state.query.toLowerCase()
        const fields = ["name", "price", "microarchitecture"]
        for(let i=0; i < fields.length; i++) {
            if(item[fields[i]].toLowerCase().includes(q)) {
                return true
            }
        }
        return false
    }

    render() {
        const itemsList = this.state.list
            .sort(this.compareItems)
            .filter((item) => this.checkItem(item))
            .map((item) => <Item key={item.id} item={item} updateHandler={this.saveItem} removeHandler={this.removeItem}/>)
        return (
            <div>
                <h1>Graphic cards collection</h1>
                <div id="optionsBar">
                    <button onClick={this.addItem}>Add new graphic card</button>
                    <SearchBar name="query" query={this.state.query} updateHandler={this.updateStateFromChild} />
                    <OrderOption name="order" order={this.state.order} fields={this.orderFields} updateHandler={this.updateStateFromChild}/>
                </div>
                {
                    itemsList.length === 0 ? <p>There are no Graphic card</p> :
                        <table>
                            <thead>
                            <tr><th>Name</th><th>Price</th><th>Image</th><th>3D Mark Fire Strike score</th><th>Microarchitecture</th><th>Actions</th></tr>
                            </thead>
                            <tbody>
                            {itemsList}
                            </tbody>
                        </table>
                }
            </div>
        )
    }
}

export default App;
