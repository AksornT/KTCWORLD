<?php

$all = [
  "Bangkok [BKK] - Thailand",
  "Chiang Mai [CNX] - Thailand",
  "Chiang Rai [CEI] - Thailand",
  "Hat Yai [HDY] - Thailand",
  "Khon Kaen [KKC] - Thailand",
  "Krabi [KBV] - Thailand",
  "Lampang [LPT] - Thailand",
  "Mae Hong Son [HGN] - Thailand",
  "Narathiwat [NAW] - Thailand",
  "Phitsanulok [PHS] - Thailand",
  "Phuket [HKT] - Thailand",
  "Koh Samui [USM] - Thailand",
  "Sukhothai [THS] - Thailand",
  "Surat Thani [URT] - Thailand",
  "Trang [TST] - Thailand",
  "Ubon Ratchathani [UBP] - Thailand",
  "Udon Thani [UTH] - Thailand",
  "Utapao [UTP] - Thailand"
];

$term = strtolower(empty($_GET['term'])?'':$_GET['term']);
$res = [];
foreach($all as $k) {
  if (strpos(strtolower($k), $term) !== false) {
    $res[] = $k;
  }
}

usleep(500000);
echo json_encode($res);