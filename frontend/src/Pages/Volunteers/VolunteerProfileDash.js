import React from 'react'
import "../Css/Volunteers/VolunteerProfileDash.css"
import Dash from "../../Components/Dashboard/Dashboard"

function VolunteerProfileDash() {
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
                                <th> Customer </th>
                                <th> Customer </th>
                                <th> Customer </th>
                                <th> Customer </th>
                                <th> Customer </th>
                                <th> Customer </th>
                                <th> Location </th>
                                <th> Order Date </th>
                                <th> Status </th>
                                <th> Amount</th>
                                <th> Amount</th>
                                <th> Amount</th>
                                <th> Amount</th>
                                <th> Amount</th>
                                <th> Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> 1 </td>
                                <td> Zinzu Chan Lee</td>
                                <td> Seoul </td>
                                <td> 17 Dec, 2022 </td>
                                <td>
                                    <p class="status delivered">Delivered</p>
                                </td>
                                <td> 
                                    <div className='action'>
                                    <button>up</button>
                                    <button className='del'>del</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td> 2 </td>
                                <td> Jeet Saru </td>
                                <td> Kathmandu </td>
                                <td> 27 Aug, 2023 </td>
                                <td>
                                    <p class="status cancelled">Cancelled</p>
                                </td>
                                <td> <strong>$5350.50</strong> </td>
                            </tr>
                            <tr>
                                <td> 3</td>
                                <td>Sonal Gharti </td>
                                <td> Tokyo </td>
                                <td> 14 Mar, 2023 </td>
                                <td>
                                    <p class="status shipped">Shipped</p>
                                </td>
                                <td> <strong>$210.40</strong> </td>
                            </tr>
                            <tr>
                                <td> 4</td>
                                <td> Alson GC </td>
                                <td> New Delhi </td>
                                <td> 25 May, 2023 </td>
                                <td>
                                    <p class="status delivered">Delivered</p>
                                </td>
                                <td> <strong>$149.70</strong> </td>
                            </tr>
                            <tr>
                                <td> 5</td>
                                <td> Sarita Limbu </td>
                                <td> Paris </td>
                                <td> 23 Apr, 2023 </td>
                                <td>
                                    <p class="status pending">Pending</p>
                                </td>
                                <td> <strong>$399.99</strong> </td>
                            </tr>
                            <tr>
                                <td> 6</td>
                                <td> Alex Gonley </td>
                                <td> London </td>
                                <td> 23 Apr, 2023 </td>
                                <td>
                                    <p class="status cancelled">Cancelled</p>
                                </td>
                                <td> <strong>$399.99</strong> </td>
                            </tr>
                            <tr>
                                <td> 7</td>
                                <td> Jeet Saru </td>
                                <td> New York </td>
                                <td> 20 May, 2023 </td>
                                <td>
                                    <p class="status delivered">Delivered</p>
                                </td>
                                <td> <strong>$399.99</strong> </td>
                            </tr>
                            <tr>
                                <td> 8</td>
                                <td> Aayat Ali Khan </td>
                                <td> Islamabad </td>
                                <td> 30 Feb, 2023 </td>
                                <td>
                                    <p class="status pending">Pending</p>
                                </td>
                                <td> <strong>$149.70</strong> </td>
                            </tr>
                            <tr>
                                <td> 9</td>
                                <td>Alson GC </td>
                                <td> Dhaka </td>
                                <td> 22 Dec, 2023 </td>
                                <td>
                                    <p class="status cancelled">Cancelled</p>
                                </td>
                                <td> <strong>$249.99</strong> </td>
                            </tr>
                            <tr>
                                <td> 9</td>
                                <td> Alson GC </td>
                                <td> Dhaka </td>
                                <td> 22 Dec, 2023 </td>
                                <td>
                                    <p class="status cancelled">Cancelled</p>
                                </td>
                                <td> <strong>$249.99</strong> </td>
                            </tr>
                            <tr>
                                <td> 9</td>
                                <td> Alson GC </td>
                                <td> Dhaka </td>
                                <td> 22 Dec, 2023 </td>
                                <td>
                                    <p class="status cancelled">Cancelled</p>
                                </td>
                                <td> <strong>$249.99</strong> </td>
                            </tr>
                            <tr>
                                <td> 9</td>
                                <td> Alson GC </td>
                                <td> Dhaka </td>
                                <td> 22 Dec, 2023 </td>
                                <td>
                                    <p class="status cancelled">Cancelled</p>
                                </td>
                                <td> <strong>$249.99</strong> </td>
                            </tr>
                            <tr>
                                <td> 9</td>
                                <td> Alson GC </td>
                                <td> Dhaka </td>
                                <td> 22 Dec, 2023 </td>
                                <td>
                                    <p class="status cancelled">Cancelled</p>
                                </td>
                                <td> <strong>$249.99</strong> </td>
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