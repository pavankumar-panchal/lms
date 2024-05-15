<?php
include ("../functions/phpfunctions.php");

ini_set('memory_limit', '2048M');
require ('../pdfbillgeneration/tcpdf.php');

$formData = json_decode($_POST['formData'], true);

$leadid = $formData['id'];
$productNames = $formData['productName'];
$purchaseTypes = $formData['purchaseType'];
$usageTypes = $formData['usageType'];
$amounts = $formData['amount'];
$gstin = $formData['gstin'];
$remarks = $formData['remarks'];

$leadQuery = "SELECT * FROM leads WHERE id = '$leadid'";
$leadResult = runmysqlqueryfetch($leadQuery);
if (!$leadResult) {
    die('Lead not found');
}

// Fetch dealer details from database
$dealerid = $leadResult['dealerid'];
$dealerQuery = "SELECT `dlrname`, `dlrcell`, `dlremail`, `state` FROM dealers WHERE id = '$dealerid'";
$dealerResult = runmysqlqueryfetch($dealerQuery);
if (!$dealerResult) {
    die('Dealer not found');
}
// Generate quote details
$quotedate = date("d-m-Y");
$year = date("Y");
$lastInsertIdQuery = "SELECT MAX(id) as max_id FROM lms_quote";
$lastInsertIdResult = runmysqlqueryfetch($lastInsertIdQuery);
$lastInsertId = $lastInsertIdResult['max_id'];

// Calculate the quotenumber for display
$quotenumber = "RSL" . $year . "Q" . str_pad($lastInsertId, 2, "0", STR_PAD_LEFT);

$validdate = date("d-m-Y", strtotime("+14 days"));
$company = $leadResult['company'];
$emailid = $leadResult['emailid'];
$customername = $leadResult['name'];
$cell = $leadResult['cell'];
$address = $leadResult['address'];
$extvname = $dealerResult['dlrname'];
$extvcell = $dealerResult['dlrcell'];
$extvemailid = $dealerResult['dlremail'];
$state = $dealerResult['state'];


for ($i = 0; $i < count($productNames); $i++) {
    $productRows .= '<tr bgcolor="#FFFFFF">';
    $productRows .= '<td width="14%" style="text-align:center;">' . ($i + 1) . '</td>';
    $productRows .= '<td width="72%" style="text-align:left;">' . $productNames[$i] . '<br/><span style="font-size:+7"><strong>Purchase Type</strong> : ' . $purchaseTypes[$i] . '&nbsp;/&nbsp;<strong>Usage Type</strong> :' . $usageTypes[$i] . '&nbsp;&nbsp;</span></td>';
    $productRows .= '<td  width="14%" style="text-align:right;" >' . number_format($amounts[$i], 2) . '</td>';
    $productRows .= "</tr>";
}

// Load template file
$template = file_get_contents('../pdfbillgeneration/template.php');

// Replace placeholders with actual data
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
$template = str_replace('##state##', $state, $template);

// Create TCPDF instance
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
$pdf->SetCreator(PDF_CREATOR);

// set header and footer fonts
$pdf->setHeaderFont(array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

//set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

//set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

//set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

//set some language-dependent strings
$pdf->setLanguageArray($l);

// remove default footer
$pdf->setPrintFooter(false);

$pdf->SetFont('Helvetica', '', 10);

// Add a page
$pdf->AddPage();

// Write the HTML content
$pdf->writeHTML($template, true, false, true, false, '');

// Output the PDF (force download)
$pdf->Output('generated_pdf.pdf', 'I');
?>