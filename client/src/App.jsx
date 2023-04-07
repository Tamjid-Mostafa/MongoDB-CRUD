import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import Form from './Form'
import hitToast from './hitToast'
import Table from './Table'

function App() {
  const [first, setFirst] = useState({
    name: '',
    email: ''
})
  const [userId, setUserId] = useState('')
console.log(userId);
  const handleSubmit = async () => {
      const url = `https://mongodb-crud-psi.vercel.app/users`;
      axios
          .post(url, first)
          .then((res) => {
              if (res.status === 200) {
                  hitToast('success', res.data.message);
                  setFirst({
                    name: '',
                    email: ''
                  })
              }
              refetch()
          })
          .catch((err) => {
              console.error(err);
          });
  }



  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get("https://mongodb-crud-psi.vercel.app/users")
        .then((res) => res.data),
  });
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const handleDelete =async (id) => {
    try {
        const dlt = await axios.delete(`https://mongodb-crud-psi.vercel.app/users/${id}`);
        if(dlt.status === 200) {
            hitToast('error', dlt.data.message)
        }
        refetch()
    } catch (error) {
        console.log(error)
        
    }
  }
  const handleUpdate = async () => {
    const url = `https://mongodb-crud-psi.vercel.app/users/${userId}`;
    console.log(url)
    try {
        const update = await axios.put(url, first);
        console.log(update)
        if(update.status === 201) {
            hitToast('success', update.data.message)
            setFirst({
              name: '',
              email: ''
            })
        }
        refetch()
    } catch (error) {
        console.log(error)
        
    }
  }

  return (
    <div className="App flex flex-col items-center justify-center w-[100vw]">
      <Form
      setFirst={setFirst}
      handleSubmit={handleSubmit}
      refetch={refetch}
      first={first}
      handleUpdate={handleUpdate}
      userId={userId}
      />
     <Table
     handleDelete={handleDelete}
     data={data}
     first={first}
     setFirst={setFirst}
     handleUpdate={handleUpdate}
     refetch={refetch}
     setUserId={setUserId}
     />
    </div>
  )
}

export default App
