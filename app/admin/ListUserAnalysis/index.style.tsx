import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
},
contentContainer: {
    padding: 20,
},
list: {
    paddingBottom: 20,
},
card: {
    display:"flex",
    justifyContent:"center",
    backgroundColor: '#f9f9f9',
    padding:"3%",
    marginBottom: 10,
    borderRadius: 8,
},
dateTitle: {
    fontWeight: '500',
    fontSize: 16,
    textAlign:"left",
    color: "#444",
    flex:1
},
detailButton:{
    flex:0.30
},
title:{
    fontSize:24,
    color:"#444",
    fontWeight: "500",
    textAlign: "center",
    marginTop:"4%"
},
date: {
    color: '#777',
    marginVertical: 5,
},
values: {
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    padding: "2%",
},
valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
},
valueName: {
    fontSize: 14,
    color: '#333',
},
valueData: {
    fontSize: 14,
    color: '#333',
},
loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
emptyText: {
    fontSize: 18,
    color: '#888',
},    

});