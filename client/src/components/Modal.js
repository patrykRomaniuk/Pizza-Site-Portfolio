import React,{useContext,useState} from 'react'
import {ModalContext} from './ModalContext'
import './modal/modal.css'

export default function Modal({ modal,setModal }) {
  const [items,setItem] = useContext(ModalContext);
  const [c,setC] = useState([]);
  const deleteItemModal = index => {
    items.splice(index,1);
    const filterItems = items.filter(item => [...item])
    setItem(filterItems);
  }
  const loopThroughGlobalContextModal = items.map( (item,index) => {
    return (
      <div className="item-modal" key={index}>
               <div>
                <p className="item-name">
                  {item.name}
                </p>
              </div>

              <div className="addNumItem">
                <p onClick={()=> {
                  if(item.count > 1){
                    setC(item.count -= 1)
                  }else{
                    alert(`You can't subtract`);
                    return;
                  }
                }}><i className="fas fa-minus-square minus"></i></p>
                <p className="item-count">{item.count}</p>
                <p onClick={()=> setC(item.count += 1) }><i className="fas fa-plus-square plus"></i></p>
              </div>

              <div>
                <p className="item-price">
                  {Math.round((item.priceNum * item.count) * 100) / 100  + '$'}
                </p>
              </div>

              <div>
                <p className="delete" onClick={() => deleteItemModal(index)}>
                <i className="fas fa-times-circle deleteBtn"></i>
                </p>
              </div>
      </div>
    )
  });
  const closeModal = () => setModal(!modal);

  return (
    <div className="modal-wrapper" style={{ display: !modal ? 'flex' : 'none'}}>
         <div className="modal-header">
          <p className="basket">Basket</p>
          <p className="closeModal"  onClick={closeModal}><i className="fas fa-window-close closeBtn" style={{ zIndex: '2' }}></i></p> 
        </div>
      <div className="basket-modal">
        <div className="main-modal">
          {loopThroughGlobalContextModal}
        </div>
        <div className="btn-modal-wrapper">
        <button className="btn-modal">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

