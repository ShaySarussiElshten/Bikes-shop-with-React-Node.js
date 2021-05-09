import React from "react";
import CustomTable from '../Table/CustomTable'

const SizeChart = (props) => {
  return (
    <>
    <CustomTable>
          <thead>
            <tr>
              <th>Size</th>
              <th>(A) Top Tube Length</th>
              <th>(B) Seat Tube Length</th>
              <th>(C) Chainstay Length Actual</th>
              <th>(D) Horizontal Chainstay</th>
              <th>(E) Front Center</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>XS</td>
              <td>570mm</td>
              <td>356mm</td>
              <td>430mm</td>
              <td>427mm</td>
              <td>678mm</td>
            </tr>
            <tr>
              <td>S</td>
              <td>585mm</td>
              <td>394mm</td>
              <td>430mm</td>
              <td>427mm</td>
              <td>693mm</td>
            </tr>
            <tr>
              <td>M</td>
              <td>603mm</td>
              <td>419mm</td>
              <td>430mm</td>
              <td>427mm</td>
              <td>711mm</td>
            </tr>
            <tr>
              <td>L</td>
              <td>627mm</td>
              <td>483mm</td>
              <td>430mm</td>
              <td>427mm</td>
              <td>737mm</td>
            </tr>
            <tr>
              <td>XL</td>
              <td>652mm</td>
              <td>533mm</td>
              <td>430mm</td>
              <td>427mm</td>
              <td>764mm</td>
            </tr>
          </tbody>
      </CustomTable>
    </>
  );
};

export default SizeChart;
