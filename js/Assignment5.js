function CustomerMenuChoice()
    {
        if (document.getElementById("customermenu").value == "Customer List")
            {
                document.getElementById("customerlistarea").style.visibility = "visible";
                document.getElementById("orderhisarea").style.visibility = "hidden";
                document.getElementById("orderarea").style.visibility = "hidden";
            }
        else if (document.getElementById("customermenu").value == "Customer Order History")
        {
            document.getElementById("customerlistarea").style.visibility = "hidden";
            document.getElementById("orderhisarea").style.visibility = "visible";
            document.getElementById("orderarea").style.visibility = "hidden";
        }
        else
        {
            document.getElementById("customerlistarea").style.visibility = "hidden";
            document.getElementById("orderhisarea").style.visibility = "hidden";
            document.getElementById("orderarea").style.visibility = "visible";
        }
        
        if (document.getElementById("customermenu").value == "Please Select An Option")
        {
            document.getElementById("customerlistarea").style.visibility = "hidden";
            document.getElementById("orderhisarea").style.visibility = "hidden";
            document.getElementById("orderarea").style.visibility = "hidden";  
        }
    }
function GetHis()
{
    var objRequest = new XMLHttpRequest(); //Create AJAX Request Object
    
    //Create URL & Query string
    var hisurl =  "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    hisurl += document.getElementById("custid").value; //Query String
    
    //Checks that the object has returned data
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var hisoutput = JSON.parse(objRequest.responseText);
            GenerateHisOutput(hisoutput);
        }
    }
    
    //Initiate the server request
    objRequest.open("GET", hisurl, true); //Open connection
    objRequest.send(); //Send data
}

function GenerateHisOutput()
{
    var count = 0;
    var displayhistext = "<table border='1'><tr><th>ProductName</th><th>Quantities Ordered</th><th>City</th>"; //string
    
    //Loop to extract data from the response object
    for (count = 0; count < result.GetCustomerOrderHistory.length; count++)
    {
        displayhistext += "<tr><td>" + result.GetCustomerOrderHistory[count].ProductName +
        "<td>" + result.GetCustomerOrderHistory[count].Total + "</tr></td>" + 
        "<br>"; //row
        
    }
    displayhistext += "</table>";
    document.getElementById("orderhisdisplay").innerHTML = displayhistext;
}
function GetCustomers()
{
    var objRequest = new XMLHttpRequest(); //Create AJAX Request Object
    
    //Create URL & Query string
    var customerurl =  "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCustomers";
    
    //Checks that the object has returned data
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var customeroutput = JSON.parse(objRequest.responseText);
            GenerateCustomerOutput(customeroutput);
        }
    }
    
    //Initiate the server request
    objRequest.open("GET", customerurl, true); //Open connection
    objRequest.send(); //Send data
}

function GenerateCustomerOutput(result)
{
    var count = 0;
    var displaycustomertext = "<table border='1'><tr><th>Customer ID</th><th>Company Name</th><th>City</th>"; //string
    
    //Loop to extract data from the response object
    for (count = 0; count < result.GetAllCustomersResult.length; count++)
    {
        displaycustomertext += "<tr><td>" + result.GetAllCustomersResult[count].CustomerID +
        "<td>" + result.GetAllCustomersResult[count].CompanyName + "</td>" +
        "<td>" + result.GetAllCustomersResult[count].City + "</tr></td>" + 
        "<br>"; //row
        
    }
    displaycustomertext += "</table>";
    document.getElementById("customerlistdisplay").innerHTML = displaycustomertext;
}

function GetOrders() //Connects to server
{
    var objRequest = new XMLHttpRequest(); //Create AJAX Request Object
    
    //Create URL & Query string
    var url =  "https://student.business.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
    url += document.getElementById("custid").value; //Query String
    
    //Checks that the object has returned data
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateOutput(output);
        }
    }
    
    //Initiate the server request
    objRequest.open("GET", url, true); //Open connection
    objRequest.send(); //Send data
}

function GenerateOutput(result) //Displays Results
{
    var count = 0;
    var displaytext = "<table border='1'><tr><th>Order Date</th><th>Order ID</th><th>Ship Address</th><th>Ship City</th><th>Ship Name</th><th>Ship Postcode</th><th>Shipped Date</th>"; //string
    
    //Loop to extract data from the response object
    for (count = 0; count < result.GetOrdersForCustomerResult.length; count++)
    {
        displaytext += "<tr><td>" + result.GetOrdersForCustomerResult[count].OrderDate +
        "<td>" + result.GetOrdersForCustomerResult[count].OrderID + "</td>" +
        "<td>" + result.GetOrdersForCustomerResult[count].ShipAddress + "</td>" + 
        "<td>" + result.GetOrdersForCustomerResult[count].ShipCity + "</td>" + 
        "<td>" + result.GetOrdersForCustomerResult[count].ShipName + "</td>" + 
        "<td>" + result.GetOrdersForCustomerResult[count].ShipPostcode + "</td>" + 
        "<td>" + result.GetOrdersForCustomerResult[count].ShippedDate + "</tr></td>" + 
        "<br>"; //row
        
    }
    displaytext += "</table>";
    document.getElementById("orderdisplay").innerHTML = displaytext;

}

