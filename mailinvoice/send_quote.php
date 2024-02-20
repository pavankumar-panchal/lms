<?php


require '../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require '../vendor/phpmailer/phpmailer/src/PHPMailer.php';
require '../vendor/phpmailer/phpmailer/src/Exception.php';
require '../vendor/phpmailer/phpmailer/src/SMTP.php';


// Include your functions file
include('../functions/phpfunctions.php');

// Your form data
$leadid = $_POST['id'];
$gstin = $_POST['gstin'];
$remarks = $_POST['remarks'];

// Fetch lead details from database
$query = "SELECT * FROM leads WHERE id = '$leadid'";
$fetch = runmysqlqueryfetch($query);
$dealerid = $fetch['dealerid'];

// Fetch dealer details from database
$dealerQuery = "SELECT `dlrname`, `dlrcell`, `dlremail` FROM dealers WHERE id = '$dealerid'";
$dealerResult = runmysqlqueryfetch($dealerQuery);

// Generate quote details
$quotedate = date("Y-m-d");
$year = date("Y");
$quoteNumberQuery = "SELECT MAX(id) as max_id FROM lms_quote";
$quoteNumberResult = runmysqlqueryfetch($quoteNumberQuery);
$autoIncrementValue = $quoteNumberResult['max_id'] + 1;
$quotenumber = "RSL" . $year . "Q" . str_pad($autoIncrementValue, 2, "0", STR_PAD_LEFT);
$validdate = date("Y-m-d", strtotime("+14 days"));
$company = $fetch['company'];
$emailid = $fetch['emailid'];
$customername = $fetch['name'];
$cell = $fetch['cell'];
$address = $fetch['address'];
$extvname = $dealerResult['dlrname'];
$extvcell = $dealerResult['dlrcell'];
$extvemailid = $dealerResult['dlremail'];

// Decode the products JSON string
$products = json_decode($_POST['products'], true);

// Prepare the products table
$productRows = '';
foreach ($products as $index => $product) {
    $productRows .= "<tr>
                    <td>" . ($index + 1) . "</td>
                    <td>{$product['productName']}</td>
                    <td>{$product['purchaseType']}</td>
                    <td>{$product['usageType']}</td>
                    <td>" . number_format($product['amount'], 2) . "</td>
                </tr>";

}

// Load HTML template
$template = file_get_contents('send_quote.html');

// Replace placeholders in the template with actual values
$template = str_replace('##quotedate##', $quotedate, $template);
$template = str_replace('##gstin##', $gstin, $template);
$template = str_replace('##quotenumber##', $quotenumber, $template);
$template = str_replace('##validdate##', $validdate, $template);
$template = str_replace('##company##', $company, $template);
$template = str_replace('##emailid##', $emailid, $template);
$template = str_replace('##customername##', $customername, $template);
$template = str_replace('##cell##', $cell, $template);
$template = str_replace('##address##', $address, $template);
$template = str_replace('##extvname##', $extvname, $template);
$template = str_replace('##extvcell##', $extvcell, $template);
$template = str_replace('##extvemailid##', $extvemailid, $template);
$template = str_replace('##productRows##', $productRows, $template);

// Create a new PHPMailer instance
$mail = new PHPMailer;

// Set email format to HTML
$mail->isHTML(true);

// SMTP configuration
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'panchalpavan111@gmail.com'; // Your Gmail address
$mail->Password = 'ukzygvcaoweqvcgz'; // Your Gmail app password
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;

// Sender info
$mail->setFrom('panchalpavan111@gmail.com', 'Relyon');
$mail->addReplyTo('panchalpavan800@gmail.com', 'Info');

// Add a recipient
// $mail->addAddress('panchalpavan800@gmail.com', 'kumar');
$mail->addAddress($extvemailid, $extvname);


// Set email subject and body
$mail->Subject = 'Quotation from Relyon';
$mail->Body = $template;

// Send email
if (!$mail->send()) {
    echo 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent.';
}
?>