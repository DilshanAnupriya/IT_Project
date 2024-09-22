import React, { useEffect,useState } from 'react'
import "../Css/Volunteers/VolunteerProfileDash.css"
import Dash from "../../Components/Dashboard/Dashboard"
 import axios from "axios"



const URL ="http://localhost:3000/users/"


const fetchHandler = async() =>{
    return await axios.get(URL).then((res) => res.data);
}
 
function VolunteerProfileDash() {
   
     const [users, setUsers] = useState();
     useEffect(() =>{
        fetchHandler().then((data) => setUsers(data.users));
     },[])

  return (
    <div >
            
    <div className='dashboard'>
   <Dash/>
   </div>
    <main class="table" id="customers_table">

        <section class="table__header">
            <h1>Volunteer Details</h1>

            <div class="input-group">
                <input type="search" placeholder="Search Data..."/>
                    <img src="images/search.png" alt=""/>
             
             </div>
                    <div class="export__file">
                        <label for="export-file" class="export__file-btn" title="Export File">+</label>
                        <input type="checkbox" id="export-file"/>
                            <div class="export__file-options">
                                <label>Export As </label>
                                <label for="export-file" id="toPDF">PDF <img src="images/pdf.png" alt=""/></label>
                                <label for="export-file" id="toJSON">JSON <img src="images/json.png" alt=""/></label>
                                <label for="export-file" id="toCSV">CSV <img src="images/csv.png" alt=""/></label>
                                <label for="export-file" id="toEXCEL">EXCEL <img src="images/excel.png" alt=""/></label>
                            </div>
                    </div>
        </section>

                <section class="table__body">
                    <table>
                        <thead>
                            <tr>
                                <th> Id </th>
                                <th> First Name </th>
                                <th> Last Name </th>
                                <th>  Date of Birth</th>
                                <th> Gender </th>
                                <th> Email </th>
                                <th> Mobile </th>
                                <th> Address </th>
                                <th> Join Date </th>
                                <th> Skills </th>
                                <th> Duration</th>
                                <th> Work</th>
                                <th> Experience</th>
                                <th> Days</th>
                                <th> Time</th>
                                <th> Description</th>
                                <th> Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> 1 </td>
                                <td> Dilshan</td>
                                <td> Anupriya </td>
                                <td> 2002-11-26 </td>
                                <td> Male </td>
                                <td> dilshananupriya@gmail.com</td>
                                <td> 0703234653 </td>
                                <td> 77/46 hokandara </td>
                                <td> Technical </td>
                                <td> Yes </td>
                                <td> 1-Month </td>
                                <td> companionship</td>
                                <td> Evening </td>
                                <td>WD</td>
                                <td>Evening</td>
                                <td>for job</td>
                                <td> 
                                    <div className='action'>
                                    <button>up</button>
                                    <button className='del'>del</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td> 1 </td>
                                <td> Dilshan</td>
                                <td> Anupriya </td>
                                <td> 2002-11-26 </td>
                                <td> Male </td>
                                <td> dilshananupriya@gmail.com</td>
                                <td> 0703234653 </td>
                                <td> 77/46 hokandara </td>
                                <td> Technical </td>
                                <td> Yes </td>
                                <td> 1-Month </td>
                                <td> companionship</td>
                                <td> Evening </td>
                                <td>WD</td>
                                <td>Evening</td>
                                <td>for job</td>
                                <td> 
                                    <div className='action'>
                                    <button>up</button>
                                    <button className='del'>del</button>
                                    </div>
                                </td>
                            </tr>
                           
                        </tbody>
                    </table>
                </section>
            </main>

            <div className='new'>
                <h1>hello</h1>
            </div>
        </div>
  )
}

export default VolunteerProfileDash