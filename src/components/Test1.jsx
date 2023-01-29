import { calculateNewValue } from '@testing-library/user-event/dist/utils'
import React, { useEffect, useState } from 'react'
// import 'yahoo-stock-api';

const Test1 = () => {
    const [data, setData] = useState(null)
    
    
    
    
    
    
    useEffect(() => {
        const call=async()=>{
            
            // const yahoo = new yahooStockAPI();
        
            // const startDate = new Date('08/21/2020');
            // const endDate = new Date('08/26/2020');
            // const response = await yahoo.getHistoricalPrices({ startDate, endDate, symbol: 'AAPL', frequency: '1d' })

        }
      call()
    }, [])
    
  return (
    <div>Test1</div>
  )
}

export default Test1