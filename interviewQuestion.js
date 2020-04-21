//已知有个Random7()的函数，返回1到7随机自然数，让利用这个Random7()构造Random10()随机1~10

function random7(){
  return Math.random()%7+1;
}

function random10(){
  let ans;
  while(ans<=40){
    ans = 7*(random7()-1)+random7();
  }
  return ans%10+1;
}
