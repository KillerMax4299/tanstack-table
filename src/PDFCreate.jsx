import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { pdf } from "@react-pdf/renderer";
import TimesRoman from "/Times-New-Roman.ttf?url";
import TimesRomanBold from "/Times-New-Roman-bold.ttf?url";

Font.register({
  family: "Times-New-Roman",
  src: TimesRoman,
});

Font.register({
  family: "Times-New-Roman-Bold",
  src: TimesRomanBold,
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 30,
    color: "#000",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    // fontFamily: "Courier",
  },
  title: {
    border: "1px solid black",
    padding: "0px 20px",
    fontSize: 32,
    marginBottom: 10,
    fontFamily: "Times-New-Roman",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    // fontFamily: "Times-Roman",
  },
  header: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    textDecoration: "underline",
    fontFamily: "Times-New-Roman-Bold",
  },

  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "33.33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#f0f0f0",
  },
  tableCol: {
    width: "14.28%",
    height: "30px",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol1: {
    width: "10%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol2: {
    width: "30%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol3: {
    width: "60%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColSpan: {
    width: "12.5%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    height: "100%",
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 500,
  },
  tableCell: {
    margin: "1px 6px",
    fontSize: 12,
    fontFamily: "Times-New-Roman",
  },
});

// Create Document Component
const MyDocument = ({ title, subtitle, content }) => {
  // const { text } = useTodoStore();

  const TableList = [
    {
      title: "Name of Work:",
      value: "",
    },
    {
      title: "Work Order No.:",
      value: "",
    },
    {
      title: "Village:",
      value: "",
    },
    {
      title: "Gram Sansad:",
      value: "",
    },
    {
      title: "Gram-Panchayat",
      value: "",
    },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text
            style={{
              fontSize: 15,
              textAlign: "right",
              marginBottom: 40,
              fontFamily: "Times-New-Roman-Bold",
            }}
          >
            ANNEXURE-V
          </Text>
          <Text
            style={{
              fontSize: 14,
              textAlign: "center",
              marginBottom: 2,
              textDecoration: "underline",
              fontFamily: "Times-New-Roman-Bold",
            }}
          >
            Karmashree : Intimation to wage-seekers on assignment of work
          </Text>
          <Text
            style={{
              fontSize: 13,
              textAlign: "center",
              marginBottom: 40,
              textDecoration: "underline",
              fontFamily: "Times-New-Roman",
            }}
          >
            (to be submitted to wage-seekers by BDO)
          </Text>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              marginBottom: 6,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                marginBottom: 4,
                fontFamily: "Times-New-Roman",
              }}
            >
              Memo No.:
            </Text>
            <div style={{ width: "120px" }}>
              <Text
                style={{
                  fontSize: 13,
                  marginBottom: 4,
                  fontFamily: "Times-New-Roman",
                }}
              >
                Date:
              </Text>
            </div>
          </div>
          <Text
            style={{
              fontSize: 13,
              marginBottom: 6,
              fontFamily: "Times-New-Roman-Bold",
            }}
          >
            To
          </Text>
          <Text
            style={{
              fontSize: 12,
              marginBottom: 2,
              fontFamily: "Times-New-Roman",
            }}
          >
            Sri/Smt.:……………………………..
          </Text>
          <Text
            style={{
              fontSize: 12,
              marginBottom: 2,
              fontFamily: "Times-New-Roman",
            }}
          >
            Job Card No.:…………………………..
          </Text>
          <Text
            style={{
              fontSize: 12,
              marginBottom: 2,
              fontFamily: "Times-New-Roman",
            }}
          >
            Village:……………………..………………
          </Text>
          <Text
            style={{
              fontSize: 12,
              marginBottom: 6,
              fontFamily: "Times-New-Roman",
            }}
          >
            Gram Panchayat:……………………………….
          </Text>
          <div style={{ marginLeft: 50, paddingTop: 10, paddingBottom: 10 }}>
            <Text
              style={{
                fontSize: 12,
                marginBottom: 2,
                fontFamily: "Times-New-Roman",
              }}
            >
              Sub.:- Intimation on allotment of works
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginBottom: 2,
                fontFamily: "Times-New-Roman",
              }}
            >
              Ref.: Application No…………………...…
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginBottom: 6,
                marginLeft: 30,
                fontFamily: "Times-New-Roman",
              }}
            >
              Date of Application……………….…
            </Text>
          </div>
          <Text
            style={{
              fontSize: 12,
              marginBottom: 6,
              lineHeight: 2,
              // marginLeft: 30,
              fontFamily: "Times-New-Roman",
            }}
          >
            With reference to your above application, you are hereby noticed to
            report for work to the worksite as per following description:
          </Text>

          <div
            style={{
              flexDirection: "column",
              marginBottom: 20,
            }}
          >
            <View style={styles.table}>
              {TableList.map((e, idx) => (
                <View style={styles.tableRow}>
                  <View style={styles.tableCol1}>
                    <Text style={styles.tableCell}>{idx + 1}</Text>
                  </View>
                  <View style={styles.tableCol2}>
                    <Text style={styles.tableCell}>{e.title}</Text>
                  </View>
                  <View style={styles.tableCol3}>
                    <Text style={styles.tableCell}>{e.value}</Text>
                  </View>
                </View>
              ))}
            </View>
          </div>
          <View style={styles.table}>
            <View style={{ flexDirection: "row", height: 60 }}>
              {/* Adjust height as needed */}
              <View style={[styles.tableColSpan, { width: "12.5%" }]}>
                <Text style={styles.tableCell}>
                  Dates of Assignment of Work
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row" }}>
                  {[...Array(7)].map((_, index) => (
                    <View key={index} style={styles.tableCol}>
                      <Text style={styles.tableCell}></Text>
                    </View>
                  ))}
                </View>
                <View style={{ flexDirection: "row" }}>
                  {[...Array(7)].map((_, index) => (
                    <View key={index} style={styles.tableCol}>
                      <Text style={styles.tableCell}></Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              marginBottom: 6,
              marginTop: 50,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                marginBottom: 4,
                fontFamily: "Times-New-Roman",
              }}
            >
              Date:-
            </Text>
            <div
              style={{
                width: "auto",
                border: "1px solid black",
                borderBottom: 0,
                borderLeft: 0,
                borderRight: 0,
                // textDecorationLine:"overline"
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  marginBottom: 4,
                  fontFamily: "Times-New-Roman-Bold",
                }}
              >
                Signature of BDO with Office Seal
              </Text>
            </div>
          </div>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
