import React from 'react'

class Item extends React.Component {

    updateState = (event) => {
        const {name, value} = event.target
        this.props.updateHandler({
            ...this.props.item,
            [name]: value
        })
    }

    render() {
        console.log(this.state)
        const removeBtn = (
            <button onClick={()=>{this.props.removeHandler(this.props.item)}}>
                Remove
            </button>
        )
        const editBtn = (
            <button onClick={()=>{this.props.updateHandler({
                ...this.props.item,
                editable: true
            })}}>
                Edit
            </button>
        )
        const saveBtn = (
            <button onClick={()=>{this.props.updateHandler({
                ...this.props.item,
                editable: false
            })}}>
                Save
            </button>
        )

        if(this.props.item.editable) {
            return (
                <tr>
                    <td><input type="text" name="name" placeholder="Name" value={this.props.item.name} onChange={this.updateState} /> </td>
                    <td className="td-2"><textarea name="price" placeholder="price" value={this.props.item.price} onChange={this.updateState} /> </td>
                    <td><input type="text" name="imgUrl" placeholder="Image's url" value={this.props.item.imgUrl} onChange={this.updateState} /> </td>
                    <td><input type="number" name="rating" placeholder="rating" value={this.props.item.rating} onChange={this.updateState} min="1" max="5"/> </td>
                    <td><input type="text" name="microarchitecture" placeholder="microarchitecture" value={this.props.item.microarchitecture} onChange={this.updateState} /> </td>
                    <td>{saveBtn} {removeBtn}</td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td>{this.props.item.name}</td>
                    <td className="td-2">{this.props.item.price}</td>
                    <td><img src={this.props.item.imgUrl} alt=""></img></td>
                    <td>{this.props.item.rating}</td>
                    <td>{this.props.item.microarchitecture}</td>
                    <td>{editBtn} {removeBtn}</td>
                </tr>
            )
        }
    }
}

export default Item