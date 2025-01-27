import React from "react";

function TipQR() {
  return (
    <div className="tipQR">
      <img src="img/qr.svg" width="100%" alt="QR Code" />
      <p>Scan with a Bitcoin Lightning wallet</p>
      <div className="tipQRAddress">
        <input
          className="tipQRInput"
          type="text"
          value="lnbc5140n1pncj87ldqgf389v5zwnp4qtyjfy99jhnpj8u9en49meskq8x08czk5axrh4cju64fvpcfenrfupp58ava342wms8mr2dw6f9ewwcnwppvvfuvh2uaq3j6ll8hj5l72g0qsp5wzfumejdcll86dtn9tvznhkkeaqt7yfnqut0kd7h5x70acl8gsms9qyysgqcqpcxqyz5vq434vvr5nxyyvumg0ee6469mq0ly3ldjvp72k20rd4q08s25zs233gg34u7gjtuzssypteezmvr0px2hg5ej6n8x60sq63ylyvsf267qqaph8vk"
          readOnly
        />
        <button className="tipQRInputCopyButton">Copy</button>
      </div>
      <button className="tipQRButton primary filled">Open in Wallet</button>
    </div>
  );
}

export default TipQR;
