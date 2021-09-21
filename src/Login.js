import React, { useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { login } from "./features/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();
  const loginToApp = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            photoURL: userAuth.user.photoURL,
          })
        );
      })
      .catch((error) => alert(error));
  };

  const register = () => {
    if (!name) {
      return alert("You must enter a full name!");
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
            photoURL: profilePic,
          })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoURL: profilePic,
              })
            );
          });
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <img
        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCA8PERIRDxEYEhIREhQRERI
        RGhERHBESGBgZGhkaGBgdIS4lHB4rHxgYJjwmLDAxNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHjQrJSs/MTY0ND
        8xPzc0PT80PzQ0MTQ/NTQ/PTQ0MTY0NDc2MTQ0NDQ0NDQxNDY0NDQ0NDQ0Mf/AABEIAHUBrwMBIgACEQEDEQH/x
        AAcAAACAgMBAQAAAAAAAAAAAAAABwUGAQQIAwL/xABPEAABAwIBBQcQBwYGAQUAAAABAAIDBBEFBgcSITE0QVFh
        c7GyCBMXIjM1VHFydIGRkpPR0hYyVWOEocIVQlKCg7MUIyVDYsEkU6LT4eL/xAAZAQEAAwEBAAAAAAAAAAAAAAA
        AAwQFAgH/xAAqEQEAAgECBQMEAgMAAAAAAAAAAQIDBDMREzEyURJCcRQhQVIFgSNhkf/aAAwDAQACEQMRAD8Acy
        EIQCEIQCEIQYKFlYQCEIQCEIQCEIQZWFlYQZWEIQZWEIQZQsIQCysIQZQsIQZWEIQCEIQCEIQCEIQCEIQCEIQYst
        HGMTio4XzyntWjUBtc47AOMreVHzpuP+FiG8ZrkeJpsu8dYteKyjzXmtJtH4V+qzjVznkxMjYzea4F5txm4Xj2Q8
        S+69g/MqisLU5GP9YYs6jLPulb+yHiX3XsH5kdkPEvuvYPzKooXvJx+IPqMv7St3ZDxL7r2D8yOyHiX3XsH5lUUJ
        ycfiD6jL+0rd2Q8S+69g/Mjsh4l917B+ZVFCcnH4g+oy/tK3dkPEvuvYPzI7IeJfdewfmVRQnJx+IPqMv7St3ZDx
        L7r2D8yOyHiX3XsH5lUUJyMfiD6jL+0rhHnDxAEFwicN8aJF/TpK/ZLZRx4lGXAaEkdhIzba+wg74KSKuua1xFXKN
        4wkkcNnC3OoM+CnomYjhMLGm1F5yRW08Yky6rFaWF2hNUxRvsDoyPjjNjsNib2Xl+36Dwyn97D8yRWfDvt+Fi53pd
        rOazsKkroJwTBKyUCwcY3Nk0Sdl9Emy2koup/wC4V3KxdFybqAQhCAUBj2VuHYbqq6hrHkXEYu99uHRFypTEqkwwTSgXMcT5AOEtaTb8lyTiNbLUyvmneXySOc97jvkm/oHFvIOl8Gy+witeI4KoCRxs1sgdEXHgGkBcq0rjZriCCDYg3BGqxXUObnFJa3CqWaY6Uha5j3H94xvcwE8ZDQUFoQsoQYQsrCAQsrCAWpV4jTwWE80cRdctEj2M0gNttIi620k+qB7rQcnP0o0Da/b9B4ZT+9h+ZetJiVNO4tgnjlcBpFsT45CBsuQDs1hcgppZhN31Pmh/uMQPlCysIBCysIBCFlBhCEIBCEIBCEIBCEIBaNVilLC7QmqIo32DtGR7IzonYbON7aj6lvLnvPn31Z5pF05EDy/b9B4ZT+9h+ZbFJX08+l1iaOXRtpdbe2TRvsvok22H1Lj5Ovqfu54h5dPzSIHAqLnV3NDy36Sr0qLnV3NDy36SpcG5CDU7VisQAsK15usPZPW6UgBELC8NOsF17A+i91q3tFKzaWLjpN7RWPy1qLI3Ep2hzYdBpFx1whhI8W31qOxXBaqjIFREWg7H7WnxOGpPyyj8boGVVPLFILhzHWP8LraiOMFUa6u3q+8fZo30NfT9pniQSEIWgywhCF68CEIQCEIQZV0zXbsk5B3SaqUrrmu3ZJyDuk1Q59uyxpt2FRz4d9vwsXO9LtMTPh32/Cxc70u1kN07+p/7hXcrF0XJupRdT/3Cu5WLouTdQCEIQeUsTXtcxwu1zS1w4QRYhc55W5t8QoZnmnhdUU5c4xyR9uWsJ1Ne3aCNl9hXSBVVfnDwVpINawEEgiz9RHoQIfBMg8VrXtaymfG0mzpJgY2sHCb6z4gF0fk7g8eH0kNJEbthZo6R2ucSXOcfG4k+lQ/ZFwTw1nqf8FY6OqjqI2TRODo5Gh7HDY5rhcFBsoVYqsu8IgkfFLVtZJG5zHtId2rmmxGzhXl2RcE8NZ6n/BBbFhaWG4nT1UIqIJA+J2kQ8ahZpIO3gsVV8Wzm4PSuLDOZXNNiIGmQAjaNLZ+aC6oS8ps7+DvNnddjHC9lx/7SVdMKxelrWdcpZmys2EsINjwEbQUG+kn1QPdaDk5+lGnYkn1QPdaDk5+lGgUCaWYTd9T5of7kaVqaWYTd9T5of7kaB8oWUuMsc6UGG1JpY4P8S5g/zXB4YGPP7uw3IG3xoGMhJvs4D7PPvf8A8qSyezqT4lUMpqbDiXO1uJl1MYCNJzjobBdA0kIVDynzoYbQOdHGTVTN1FsVtFp/5POr1XQXxCQlXnqxJxPWaanjbvB4lkcP5tJo/JedNnnxRpGnDTvbvgNlYfQQ+w9SB/oS6yXzr0Fa5sVQ00srrAaZDo3OJsAH729tA2piAg7EGUIWvXVkVPG6Wd7Y42C7nvIaGjxoNhCUuP554I3OZQU5mIuOuSksaeMNHbEepVk56MWvfrNLbg0J/wD5EHQC57z599WeaRdORWfAM9Eb3BmIU/Wr6uuwXe0cbmHWB4iVU89FTHNiUUsTw+N9HE5jmm4c0vk1goF6nX1P3c8Q8un5pElE6+p+7nX+XT80iBwKi51dzQ8t+kq9Ki51dzQ8t+kqXBuQg1O1YrFK5N4w6gqWzAFzdbZGja5h22499RS2KCilqXiKBuk83IaLC9tZ2rVvETWYt0YlJmLRNep2UWUtDOwOZUMFxcteQ1zfG07FBZWZZU8UL4qZ4lme0tDma2x3FiS7h4gqP9DMU8GPtM+K8qnJTEImPkkgLWMaXPddnataLk7eBU64MUW4+riv21Oaa8PTw/2hULCsDcj8TIBFObHWO2Z8VctetesqFaWt0jigEKf+huJ+DH2mfFQ8lHK2Qwlh64HaBYO2OlwC21IvWekvZx2r1iXghWqjyCxGUBzmtiB3nuF/ULr7qc32IRi7QyS2811j6LrnnU48OMO/p8vDjwlUlhe9XSSwPLJmOY4bWvFj/wDYXipIniimOH2kK6Zrt2Scg7pNVKV1zXbsk5B3Saos+3ZNpt2FRz4d9vwsXO9LtMTPh32/Cxc70u1kN07+p/7hXcrF0XJupRdT/wBwruVi6Lk3UAhCEHy/YfEVx7X92l5R/SK7CfsPiK49r+7S8o/pFBrrqzIPvVh/mkPQC5TXVmQferD/ADSHoBBzjlwP9UrvOpekVAqdy576V3nUvSKgkFnrMrZ3YbT4bCSyKMPM5BsZnOcXBp/4i+zfKrCumb3IWTGXvc9xipoiA+S1y5x16DL6r21k71xwpp1GaDCHRlrBIx9rCQPLjfh0TqQc8KVydx2ow2dtRTOLXNPbNudGRu+1w3wvXKvJ+bC6t9LN2xbZzHgWEjHbHAb2+LcIKhUHW2TeNRYjSxVUP1ZG9s3fY8anNPGDqSo6oHutByc/SjW3mCxFxZWUrjqY5k7BwFwLH9Fi1OqB7rQcnP0o0CgTSzCbvqfND/cjStTGzN4jFR1FdUTnRjionPceG0kdgOEk6kDTzkZXNwmlOgQaqYFsDdujwvI4Bz2XNMkjnuLnkuc4lznEkkk6ySTtKl8q8flxSrkqpdWl2sbN6OMX0Wj1k+MlRlHSyTyMihaXySODWMaLlzjvAIPbCsNnrJmU9OwvkkcA1o/Mk7wG+V0vkPkjBhFOGNs6d4BnlsAXu4BwNF9QWjm6yJjwiHTkAdVytHXX7dAbdBvEN876nsqsWFBRVNTvxRuLeN5Fmj1kIFhncy8e1z8NonluiNGqlabEkjubSOI6/VwpNL1nmdI9z3m7nuLnE77ibkqwZvsBGJYjDTvF4heWbk2C5HpOi3+ZB84HkTimIM65TUrnR3sJHFsbT5JcRpDjF1549kfiWHAOq6ZzGE2EjS17b8bmk29Nl1RDC2NrWMaGsaA1rWgANA2ABeWIUUdTE+GZodHI0te067goOPU6szeWckh/ZtU65DC6le43JDdsZ9GscQPElHjNCaWqqKc/7E8kV+HQeW3/ACRgte+kqYahhs6KRrweIHX+V0HXMsrWNc95DWtBc5x2BoFySuas4eWcuLVBaxxbSREiGPZpW/3HDfcfyHpTXzu44YMJHWzY1rmRAjaI3NL3fkLfzLnZAL0ihc82Y0uPA0Fx9QW5gWFyV1VDSxfXmeGA/wAI33HiABPoXUGTmTNHhkTYqaJoIADpSAXyO3y5230bAg5Ump5I9T2OYeBzS3nXy5xNrkmwsL67Dbbxayut8YwWlro3RVULZGuBHbAXbxtdtaeMLmLLDAXYZWzUriS1hDo3HVpxuF2n/rxgoIJOvqfu51/l0/NIkonX1P3c8Q8un5pEDgVFzq7mh5b9JV6VFzq7mh5b9JUuDchBqdqxVqz5vO+MXkv6KrCs+bzvjF5MnRK1MvZb4Y+Hcr8wc6icqdwVfm0vQKllE5U7gq/NpegVkU7obmTtkh10TB9RvkjmXOxXRNP9Rnkt5grms9v9qH8f7nqVB4Rk/FTyzVBAfNM9ztIgdo0nU1vBx8KnFT8sMsBQuEMLQ+ct0jpXtGDsvbaeJVKRa0+mv5XctqVj1W/C4LCUtLnErmvBlax7L62hpYbcRumfhddHVQsniN2SN0hzEHjBBHoXWTFbH3OcWemX7VaeUOBw18RZIAHAExvAGkx3EeDhCSNbSvgkfFILOY4tcOMf9LoZKXOdRhlYyRot16IF3lNJbzaKn0mSfV6Z6K2txRNfXHVTFdM127JOQd0mqlq6Zrt2Scg7pNVvPt2UtNuwqOfDvt+Fi53pdpiZ8O+34WLnel2shunf1P8A3Cu5WLouTdSi6n/uFdysXRcm6gEIQg+X7D4iuPa/u0vKP6RXYT9h8RXHtf3aXlH9IoNddWZB96sP80h6AXKa6syD71Yf5pD0Ag5wy476V3nUvSKglO5cd9K7zqXpFQSDpTNBE1uDU1hrc6VzjwkyO2+iw9Cu6pmaTvNS/wBTpuVzQJHP9CBNRPAFzHK0nhs5pHOUok4s/wD9eh8mXnak6gauYM/+ZVjhph0wtrqge60HJz9KNamYTdtV5sOmFt9UD3Wg5OfpRoFAvRkjmhzQSA8AOAJAcAbi/DrAPoXmpHBMJnr6iOmgbpSSusOBo2kngAFygjlZsgcoG4XXxVD2B0ZvHJcAuax2ouYd4jUeMXG+vPLXJeXCKo07zptcwSRSWsHtOo+kOBFvFwquoOxoJ2SsbJG4OY9oc1w1hzSLghUHPbUFmElo/wByeNp8Qu79KrWZjLGxGGVL9RN6Rxtt2ujv+Y9I4Fas9FKZMIe4C5iljk9F9E9JBzkvemqpYXacMjo3WtpRucw24Lg7NQXgp/IrA48TrWUskxh641+i4AOu9o0tHXwgO9SDQ/bld4XP72X5kftyu8Ln97L8ybnYQi8Of7tvxWOwhF4c/wB234oExJK57i57i5ziS5ziXEk7SSdpXmnT2EGeHO92PijsIM8Od7sfFBD52ahzqLBmu36dz3ePRjA/7SuTjz4YZ1qmw4t1thD6e/CdFpHQKTiBj5j4GvxRzz/t00jm8TiWtv6i71roRc25oMTZTYtEHmzahjqe5/jfYs9bmgfzLpJALnvPn31Z5pF05F0IudM9VUyTF3NYbmGCKJ/E7tn29TwgX6dfU/dzr/Lp+aRJROvqfu54h5dPzSIHAqLnV3NDy36Sr0qLnV3NDy36SpcG5CDU7VirVnzed8YvJk6JVYVnzed8YvJk6JWpl7LfDHw7lfmDnUTlTuCr82l6BUsonKncFX5tL0CsindDcydskOV0TT/UZ5LeYLnYroqn+ozyW8wVzWe3+1D+P9z0SIyqeXV9UXG5664egahzJ7pDZT7uquWdzrnR90u9f2R8osJt5sJCaEg/uzPA4gQDzk+tKQJs5rdxP5d3M1T6vbVtDurolvnYbrpTyg6KZCW+dnbSf1P0KnptyF/V7Ul0rpmu3ZJyDuk1UtXTNduyTkHdJq0M+3Zl6bdhUc+Hfb8LFzvS7TEz4d9vwsXO9LtZDdTWBZU4hhzXtoqgwtkIc8Bsb9IgED6zTwlSnZLx3w53u6f5FUUILd2S8d8Od7un+RHZLx3w53u6f5FUUIOrcjq2Wpw2lnndpySQNe95DRdxGs2AsuWq/u0vKP6RXTub3vPRebN5lzFX92l5R/SKDXXVmQferD/NIegFymurMg+9WH+aQ9AIOcMuD/qld51L0ioJTmW/fOu87m6ZUGg6YzSd5qX+p03K5qmZpO81L/U6blc0CW6oD69D5MvO1J1OLP8A/XofJl52pOoGpmE3bVebDphbfVA91oOTn6Ua1Mwm7arzYdMLb6oHutByc/SjQKBNHMIP9QqfND/cjSuTSzCbvqfND/cjQMrORksMVonNYP8AyIbyU54XAa2X4HD87LmVzSCQRYg2IOqxXZKQWeXJT/CVAroG2hqXf5gA1Mn1kniDtvjvwoFrFK5jmvadFzSHNcNrSDcEeldFZJ45FlFhctPMQJ+tGCpbs7ZwIbI3iNr8RBC5xU5kjlDLhdXHUxawO1lZ/wCpGSNJv5XHGAgj8Vw+Wknkp5m6L4nljgeLYfERY+leFNUPieySNxY9jg5jm6i1wNwQugMrskaXKKnjrqJ7WzuYDHJbtZW/wP3wQQRfe2JG4zgVZQvLKuB0Tr2BcO1d5Lhqd6EDWyczzR6DWYlC/TGozQBrg7jcwkWPiurbHnRwIi5qy3idFPf8m2XNKEHRVZnewaMHQdLMd4Rx6N/S8tW/kPl3FjUlQyOF0Qgaxw0y0lwcXAnVstYetczJlZj3SMxJxDHmOSnkjc8Bxa1wcx40jsB7Qj0oGvnHwI4jhs0TBeRlpohwvZfUPGCR6Vy+4EajqI1ELspJfObm3kL312Gx6Qf208DBra7fewb4O+PGUCfY8tcHNNi0hwI3iNYKcOTWeVrI2x4jC9zmgDr0GgdMDfc1xGvxFJ57C0lrgQQSCDcEEbQRvFfCB247npg625uHwPMhFhJUBjWtPDotcS78kmKqofNI+SVxe+Rxc9ztrnE3JK+6GimqZGxQRukkcbNYwFxPoG9xq75W5DHCsLp5ZrOqZaj/ADSNYjYWGzBw6xclAv06ep9d2mIDgdTH1iX4JLJy9T4e+Q81P99A5lRc6u5oeW/SVelRc6u5oeW/SVLg3IQanasVas2bzvjF5MnRKrSs2bzvjF5MnRK1MvZb4Y+Hcj5g51E5U7gq/NpegVLKJyp3BV+bS9ArIp3Q3MnbJELomD6jPJHMudl0TB9RvkjmVzWe1Q/j/c9Ehsp93VXLO50+Eh8p93VXLO51zo+6Xev7IRabOa7cT+Xf0WpTJsZrtxP5d/Rap9Xtquh3f6XVLfOztpP6n6EyEt87O2k/qfoVPTbkNDV7Ul0rpmu3ZJyDuk1UtXTNduyTkHdJq0M+3Zl6bdgxcQyeoKp/XKmkhmfYN05Y2POiNguRs1la30Owj7OpvdRfBTyFkN1A/Q7CPs6m91F8EfQ7CPs6m91F8FPIQQP0Owj7OpvdRfBH0Owj7OpvdRfBTyEGvTU0cMbY4mNjjYNFjGANa1vAANQCiXZH4SSScOpiTrJMUWs+pTywggvodhH2dTe6i+Cl6anjhY2OJgYxjQ1jGANDWjYABsC9kIISfJXC5HufJQU73vcXPe+KNxc4m5JJGskr5+h2EfZ1N7qL4KdQg1qGihp4xFTxtijbctZG1rGtubmzRq1kkrZQhBHYjgtHVlpqqaKcsBDTKxkmiDa9rjVsHqWn9DsI+zqb3UXwU6hBGYdgVDSOL6Wligc4aLnRMZGS297EgbF9YlgtFVlpqqaKcsBDTKxkmiDa9rjVsCkUIIL6HYR9nU3uovgtrD8BoaRxfTUsUD3N0XOiYyMltwbEgbLgH0KTQgFq11DBURmKeJssbiCWSNa9pINxcHVtW0hBBfQ7CPs6m91F8EfQ7CPs6m91F8FOoQamH4fT0rOt08TIWXLtCJrWNudpsNV16VVJFM0smjbI07WyNa8H0Fe6ygqFbm3wSc3dRNafujJCPUwgLUbmowIbaZ58cs//AE5XlCCsUWQWDQWLKGMkbDIDLb27qxQU8cbdGNjWNH7rAGj1BeqEAhCEEDjOSGGV5JqaRj3HbI0GNx/nbY/moJmajAwbmB7h/CZJbfkbq9oQRmEYFRULdGkp2Q32ljQHO8p20+le2I4bTVTAyphZMwO0g2VrXgO2XAO/rK3UIIL6HYR9nU3uovgtzDcGo6QvNLTRwF9tMwsZHpWva9hrtc+tSKEAqLnV3NDy36SryqVnQgc+jY9ouGSgutvAgi/ivb1qXBuQg1Mf4pKhetLUyQvD4nuY8Xs5pLSL7dYXiha7CieHRK/SLEPC5vbd8V8TY9Wva5j6mV7HAtc1z3EOadRBF9YUddF1z6K+Id8y/mf+iyk/pDiA1Crm1f8AN3xUWhezWJ6w8ra1ekpX6RYh4XN7bvio6aVz3Oe9xc9xu5zjcuPCSvNCRWI6QWva3WQt2kxWqgaWwTvjaTpFrHOaCeGwWkshezET1eRaY+8JT6RYh4XN7bvitWsxGoqNH/ETPl0b6Om5ztG+21/EtVC5ilY6Q6nJaY4TMhXPNduyTkD0mqlq85rIHf4maX9xsWgT/wAi4WH5LjUbcpNNH+WDWQhCyG6EIQgEIQgFhCEGVhCEGVhCEAhCEGVhCEAhCEAhCEAhCEAhCEAhCEAhCEAhCEAhCEAhCEAhCEAhCEAvGeFkrHMkaHMcC1zXawQhCClVWbmkc4uZLIxp/c7VwHiJF149jWn8Jk9liEKxzsnlSnDj8DsbU/hMnssR2NqfwmT2WIQnOyeXnIx+B2NqfwiT2WI7G1P4RJ7LEITn5PLzk4/A7GtP4TJ7LEdjWn8Jk9liEJz8nl7ycfgdjWn8Jk9liOxrT+EyeyxCE5+TycnH4HY2p/CJPZYjsbU/hEnssQhOfk8nJx+GY829NqLqiQjfFoxf02VxwjC4KOIRQM0Wjbvlx4Sd8oQuMmS1uspsWOtZ+0P/2Q=="
      />
      <form>
        <input
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
        <input
          placeholder="Profile picture URL"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
          type="text"
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button type="submit" onClick={loginToApp}>
          Sign in
        </button>
      </form>
      <p>
        Not a member?{" "}
        <span className="login__register" onClick={register}>
          Register Now
        </span>
      </p>
    </div>
  );
}

export default Login;
