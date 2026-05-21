
import './App.css';
import { useState } from 'react';




const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];




export default function App() {
  
  const [isShowAddFriend, setIsShowAddFriend] = useState(true);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  

  function handleShowAddFriend() {
    setIsShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setIsShowAddFriend(false);
  }

  function handleSelectFriend(friend){
    setSelectedFriend((curr) => curr?.id === friend.id ? null : friend);
    setIsShowAddFriend(false);
  }

  function handleSplitBill(value) {
    if (!selectedFriend) return;


  }


  return (
  
    <div className="app">
      
      <div className='sidebar'>
        
        <FriendList 
          friends={friends} 
          selectedFriend={selectedFriend} 
          onSelectedFriend={handleSelectFriend} />
        
        { isShowAddFriend && 
          <FormAddFriend onAddFriend={ handleAddFriend } /> }
        
        <button className='button' onClick={ handleShowAddFriend }>
          {!isShowAddFriend ? "New Friend" : "Close"}
        </button>

        {/* <Button onClick={ handleShowAddFriend }>
          {isShowAddFriend ? "New Friend" : "Close"}
        </Button> */}
      </div>

      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill} />}
    </div>
  );
}

function FriendList({ friends, selectedFriend, onSelectedFriend }) {
  
  return (
    <ul key="friend-list">
      {friends.map((friend) => 
          <Friend 
            friend={friend} 
            selectedFriend={selectedFriend}
            onSelectedFriend={onSelectedFriend} 
            key={friend.id}/>
      )}
    </ul>
  );
}

function Friend({ friend, selectedFriend, onSelectedFriend }) {
  
  const isSelected = selectedFriend?.id === friend.id;


  return (
    <li className={isSelected ? 'selected' : ''} key={friend.id}>
      <img src={friend.image} alt={friend.name} />
      
      <h3>{friend.name}</h3>
      
      {friend.balance < 0 && 
        <p className="red">You owe {friend.name} ${Math.abs(friend.balance)}</p>}
      {friend.balance > 0 && 
        <p className="green">{friend.name} owes you ${Math.abs(friend.balance)}</p>}
      {friend.balance === 0 && 
        <p>You and {friend.name} are even</p>}

      <button className='button' onClick={() => onSelectedFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </button>

      {/* <Button onClick={() => onSelectedFriend(friend)}>
        Select
      </Button> */}
    </li>
  );

  /* <Button onClick={() => console.log('Selected friend:' + friend.name)}> */
}

function FormAddFriend({ onAddFriend }) {
  
  const [name, setName]   = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID()
    
    const newFriend = {
      id: id,
      name,
      image: image || `https://i.pravatar.cc/48?u=${id}`,
      balance: 0,
    };

    console.log(newFriend);
    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }


  return (
    <form className='form-add-friend' onSubmit={handleSubmit}>
      <label>👫 Add friend</label>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder='Friend name' 
      />
      
      <label>👫 Image link</label>
      <input 
        type="text" 
        value={image} 
        onChange={(e) => setImage(e.target.value)} 
        placeholder='Image link' 
      />
      
      <button className='button'>Add</button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {

  const [billValue, setBillValue] = useState(0);
  const [paidByUser, setPaidByUser] = useState(0);
  const [whoIsPaying, setWhoIsPaying] = useState("You");
  const payedByFriend = billValue ? billValue - paidByUser : "";


  function handleSubmit(e){
    e.preventDefault();

    if (!billValue || billValue ) return;

    onSplitBill(whoIsPaying ==="You" ? payedByFriend : -paidByUser)
  }


  return (
    <form className='form-split-bill' onSubmit={handleSubmit}>
      <h2>Split a Bill with <span style={{color: '#ff922b'}}> {selectedFriend.name}</span></h2>
      
      <label>💰 Bill value</label>
      <input 
        type="text" 
        value={billValue} 
        onChange={(e) => setBillValue(Number(e.target.value))} />
      
      <label>👫 Your expense</label>
      <input 
        type="text" 
        value={paidByUser} 
        onChange={(e) => setPaidByUser(Number(e.target.value) > billValue ? billValue : Number(e.target.value))} />
      
      <label>{selectedFriend.name}'s expense</label>
      <input type="text" value={payedByFriend} disabled />

      <label>😍 Who pay the bill</label>
      <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value="You">You</option>
        <option value={selectedFriend.name}>{selectedFriend.name}</option>
      </select>
      
      <button className='button'>Split Bill</button>
    </form>
  );
}

// function Button({ children, onClickFunc }) {
  
//   //console.log(onClickFunc);

//   return (
//     <button className='button' onClick={onClickFunc}>
//       {children}
//     </button>
//   );
// }

