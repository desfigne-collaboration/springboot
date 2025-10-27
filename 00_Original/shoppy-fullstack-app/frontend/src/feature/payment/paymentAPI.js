import { axiosPost } from '../../utils/dataFetch.js';

/**
    결제
*/
export const getPayment = async() => {
      const { userId } = JSON.parse(localStorage.getItem("loginInfo"));
      const url = "/payment/kakao/ready";
      console.log("userId --> ", userId);
      const data = {
          "orderId" : "1234",
          "userId" : userId,
          "itemName" : "테스트 상품",
          "qty" : "10",
          "totalAmount" : "1000", // 결제 금액 (KRW)
      }
      try {
          const kakaoReadyResult = await axiosPost(url, data);
          // window.location.href = response.data.next_redirect_pc_url;
            console.log("getPayment :: response --> ", kakaoReadyResult.next_redirect_pc_url);

          if (kakaoReadyResult.tid) {
          console.log("tid-->", kakaoReadyResult.tid);
              // setQrUrl(response.data.next_redirect_mobile_url);
              window.location.href = kakaoReadyResult.next_redirect_pc_url;
          }
      } catch (error) {
          console.error("QR 결제 요청 실패:", error);
      }
}