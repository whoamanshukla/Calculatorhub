<!DOCTYPE html>
<html>
<head>
    <title>CalculatorHub - Age Calculator</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body{
            font-family: Arial, sans-serif;
            background:#f4f4f4;
            text-align:center;
            padding:30px;
        }
        .box{
            background:white;
            max-width:400px;
            margin:auto;
            padding:20px;
            border-radius:10px;
            box-shadow:0 0 10px rgba(0,0,0,0.1);
        }
        input,button{
            width:100%;
            padding:12px;
            margin-top:10px;
            font-size:16px;
        }
        button{
            background:#007bff;
            color:white;
            border:none;
            border-radius:5px;
        }
        #result{
            margin-top:20px;
            font-size:20px;
            font-weight:bold;
        }
    </style>
</head>
<body>

<div class="box">
    <h1>Age Calculator</h1>

    <input type="date" id="dob">

    <button onclick="calculateAge()">Calculate Age</button>

    <div id="result"></div>
</div>

<script>
function calculateAge(){
    let dob = new Date(document.getElementById("dob").value);
    let today = new Date();

    let age = today.getFullYear() - dob.getFullYear();

    let monthDiff = today.getMonth() - dob.getMonth();

    if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())){
        age--;
    }

    document.getElementById("result").innerHTML =
    "Your Age is " + age + " Years";
}
</script>

</body>
</html>
