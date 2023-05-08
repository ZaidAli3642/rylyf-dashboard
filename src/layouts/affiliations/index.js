/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// React
import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// pagination
import Pagination from "@mui/material/Pagination";

// Data
import authorsTableData from "layouts/affiliations/data/authorsTableData";
import projectsTableData from "layouts/affiliations/data/projectsTableData";
import server from "../../api/server";
import { Author } from "./data/authorsTableData";

function Affiliations() {
  const { columns, rows } = authorsTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;
  const [page, setPage] = useState(0);
  const [affiliations, setAffiliation] = useState([]);

  const getUsers = async () => {
    server
      .call("affiliation.get.admin", { page })
      .then((res) => {
        setAffiliation(res);
        console.log("rows : ", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, [page]);

  const renderElements = (row, key) => {
    console.log("row affiliation: ", row, key);
    let element;
    if (key === "approve") {
      element = row[key] === true ? <Author name={"Approved"} /> : <Author name={"Pending"} />;
    } else {
      element = <Author name={row[key]} />;
    }

    return element;
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">Affiliations table</ArgonTypography>
            </ArgonBox>
            <ArgonBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={affiliations} renderElements={renderElements} />
            </ArgonBox>
            <ArgonBox my={1} mr={5} display="flex" justifyContent="flex-end">
              <Pagination count={10} onChange={(e, value) => setPage(value)} />
            </ArgonBox>
          </Card>
        </ArgonBox>
        {/* <Card>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <ArgonTypography variant="h6">Projects table</ArgonTypography>
          </ArgonBox>
          <ArgonBox
            sx={{
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            <Table columns={prCols} rows={prRows} />
          </ArgonBox>
        </Card> */}
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Affiliations;
