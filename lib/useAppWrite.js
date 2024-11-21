import React from 'react'

export default function useAppWrite(fn) {
    const [data,setData]=React.useState([])
    const [loading,setIsLoading]=React.useState(false)


    const fetchdata=async ()=>{
        setIsLoading(true);
        try {
          const response=await fn;
          setData(response)
        } catch ({error}) {
          Alert.alert('Error',error.message)
        }
        finally{
          setIsLoading(false)
        }
    }
    React.useEffect(()=>{
     
      fetchdata()
    },[])
    const refetch=()=>fetchData()
    

    return {data,loading,refetch}

}
