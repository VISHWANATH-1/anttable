import './App.css';
import 'antd-css-utilities/utility.min.css';
import { useState } from 'react';
import {Button, Input, Modal, Table} from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
function App() {
  const [isEditing, SetIsEditing]=useState(false);
  const[editingUser,setEditingUser]=useState(null);
  const [dataSource, setDataSource] = useState ([
    {
     id: '1',
      name: 'Ram',
      age: 32,
      address: '11 Deoghar Ranchi',
    },
    {
      id: '2',
      name: 'Shyam',
      age: 42,
      address: '12 Ranchi Jharkhand',
    },
    {
      id: '3',
      name: 'Krishna',
      age: 42,
      address: '13 Dhanbad Jharkhand',
    },
    {
      id: '4',
      name: 'Rajan',
      age: 42,
      address: '14 Bokaro Jharkhand',
    },
  ]);
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: '1',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: '2',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: '3',
    },
    {
      key: "4",
      title: "Actions",
      render:(record)=> {
        return(
          <>
             <EditOutlined onClick={()=>{
              onEditUser(record)
             }} />
             <DeleteOutlined onClick={()=>{
              onDeleteUser(record)
             }} style={{color:"red", marginLeft:"12px"}}/>
          </>
        )
      }
    }
  ];
  const onAddUser=()=>{
    const randomNumber = parseInt(Math.random()*1000)
    const newUser={
      id: randomNumber,
      name: 'Name'+randomNumber,
      age: 'Age'+randomNumber,
      address: 'Address'+randomNumber,
    }
    setDataSource(pre=>{
      return [...pre, newUser]
    });
  };
  const onDeleteUser=(record)=>{
    Modal.confirm({
      title:"Are you sure ! To delete this user",
      okText: "Yes",
      okType:"danger",
      onOk:()=>{
        setDataSource(pre=>{
          return pre.filter(user=>user.id !== record.id)
         });
      }
    })
    
  };
  const onEditUser=(record)=>{
     SetIsEditing(true);
     setEditingUser({...record});
     }
     const resetEditing=()=>{
      SetIsEditing(false);
      setEditingUser(null)
  }
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={onAddUser}>Add New User</Button>
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Edit User"
          visible={isEditing}
          okText="Save"
          onCancel={()=>{
             resetEditing()}}
          onOk={()=>{
            setDataSource(pre=>{
              return pre.map(user=>{
                if (user.id === editingUser.id){
                    return editingUser
                } else{
                  return user
                }
              })
            })
            resetEditing()
          }}
           
        >
          <Input value={editingUser?.name} onChange={(e)=>{setEditingUser(
            pre=>{return{...pre, name:e.target.value}}
          )}} />
          <Input value={editingUser?.age} onChange={(e)=>{setEditingUser(
            pre=>{return{...pre, age:e.target.value}}
          )}} />
          <Input value={editingUser?.address} onChange={(e)=>{setEditingUser(
            pre=>{return{...pre, address:e.target.value}}
          )}} />
        </Modal>
      </header>
    </div>
  );
}

export default App;
