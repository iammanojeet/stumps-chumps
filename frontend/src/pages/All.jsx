import React from 'react'
import K from "./HomePageKoushtav";
import Rulesk from './rulesKoushtav';
import Recordsk from './recordsKoushtav';
import Historyk from './historykoushtav';


const All = () => {
  return (
    <div className='All'>

        <div className='Home'>
     <K/>
        </div>
        
        <div className='Rules'>
        <Rulesk/>
    </div>

    <div className='Match history'>
     <Recordsk/>
        </div>

        <div className='Records'>
     <Historyk/>
        </div>
    </div>
    
  )
}

export default All;