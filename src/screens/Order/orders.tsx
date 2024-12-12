import _ from "lodash";
import React, { useEffect, useRef } from 'react'
import { useParams } from "react-router-dom";
import { useStoreState, useStoreActions } from '../../store/hooks';
import { AppSidebar, AppFooter, AppHeader } from '../../components/index'
import { Toaster } from 'react-hot-toast';
import { config } from '../../config';
import './orders.css'
import ImgOrVideoRenderer from "../../components/ImgOrVideoRenderer/ImgOrVideoRenderer";

export default function Orders() {

  let { orderId = "" } = useParams();

  let fetchOrderDetails = useStoreActions(action => action.order.fetchOrderDetails);

  let orderStoreData = useStoreState(action => action.order.data);

  const { previewOrderInfo = {}, isPreviewLoaderStatus = false } = orderStoreData;

  const { orderId: reservedOrderID = "", status = "", userId = {}, shippingAddress = {}, products: productList = [] } = previewOrderInfo || {};

  const { doorNo = "", pinCode = "", state = "", street = "" } = shippingAddress || {};

  const { name = "", email = "", phone = "" } = userId || {};

  const contact = email ? email : phone;

  const customerName = name ? name : `${email}`.split('@')[0];

  useEffect(() => {
    fetchOrderDetails({ orderId })
  }, [orderId])

  let totalCost = useRef(0);

  const setTotalCost = (cost) => {

    totalCost.current = _.sum([totalCost.current, cost])

  }


  return <> <div>
    <AppSidebar />
    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <AppHeader heading={"Orders Details"} />
      <div className={`body flex-grow-1`}>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <br></br>
        <div className="flex space-evenly">

          <div className="with70">
            <div className="whiteBg">
              <div className="flex space-between commonPadding">
                <div className="flexCol"><span className="FONT13 BOLD">{`Order ID ${reservedOrderID}`}</span> <span className="FONT12">   Today, 04:00 AM</span></div>
                <div className="alignCenter"> <button className="greenColor cicleSmall"></button> {`${status}`}</div>
              </div>
              <hr></hr>

              {productList.map(product => {

                const { product: item = [], quantity = 0 } = product || {}

                const productTotal = quantity * item.price;

                setTotalCost(productTotal);
                
                return <div className="flex space-between">
                  <div className="flex alignCenter">
                    <div>

                      <ImgOrVideoRenderer
                        src={_.get(item, 'images[0]', config.CIRCLE_ICON)}
                        className={"productImage"}
                        width={100}
                        height={100}
                        videoStyles={{ background: "#000", borderRadius: "50%" }}
                      />
                       
                       </div>
                    <div className="flexCol commonPadding">  <span className="BOLD">{`${item.productName}`}</span>
                      <span className="FONT12">{`₹${item.price}`}<br></br> per piece </span>
                      <span className="FONT12">{`${quantity}  X ${item.price}`}</span>
                    </div>
                  </div>
                  <div className="flex alignCenter"><div>{`₹${productTotal}`}</div></div>
                </div>
              })}
              <br></br>
              <div className="space-between commonPadding"><span className="FONT12">Item total</span><span> {`₹${totalCost.current}`}</span></div>
              <div className="space-between commonPadding"><span className="FONT12">Delivery</span><span>  ₹50</span></div>
              <div className="space-between commonPadding"><span className="FONT13">Grand Total</span><span> {`₹${totalCost.current - 50}`}</span></div>
            </div>
            <br></br>
            <div className="whiteBg">
              <div className="flex space-between">
                <div className="BOLD">Customer Details</div>
                <div>View Profile</div>
              </div>
              <hr></hr>
              <div>
                <div className="space-between commonPadding"><span><div className="with50"> <div className="BOLD">Name</div><div></div>{`${customerName}`}</div></span><div className="with40"> <div className="BOLD">Mobile/Phone</div><div></div>{`${contact}`}</div></div>
                <div className="space-between commonPadding"><span><div className="with50"> <div className="BOLD">Location</div><div>{`${doorNo}`}</div></div></span><div className="with40"> <div className="BOLD">LandMark</div><div></div>{`${street}`}</div></div>
                <div className="space-between commonPadding"><span><div className="with50"><div className="BOLD">City</div><div>-</div></div></span><div className="with40"><div className="BOLD">PinCode</div><div>{`${pinCode}`}</div></div></div>
                <div className="space-between commonPadding"><span><div className="with50"> <div className="BOLD">State</div><div>{`${state}`}</div></div></span><div className="with40"> <div className="BOLD">Payment</div><div>Online</div></div></div>
              </div>
            </div>
            <br></br>
          </div>
          <div className="with20">
            <div className="whiteBg smallBoxLayout">
              <div className="flex space-between alignCenter">
                <span className="BOLD">Notes</span>
                <button className="addButton">ADD</button>
              </div>
              <br></br>
              <div className="FONT12 textCenter">Add order notes here.</div>
            </div>
            <div className="whiteBg smallBoxLayout">
              <div className="BOLD">ACTIVITY</div>
              <div className="flexCol">
                <span className="FONT13 BOLD"> <button className="cicleSmall blackColor"></button>  Order Accepted </span>
                <span className="FONT12">{`${email}`}</span>
                <span className="FONT12">- Seller (You)</span>
                <span className="FONT12">Yesterday, 02:15 PM</span>
              </div>
            </div>
            <div className="whiteBg smallBoxLayout">
              <div className="flex space-between alignCenter">
                <span className="BOLD">Tags</span>
                <button className="addButton">ADD</button>
              </div>
              <br></br>
              <div className="FONT12 textCenter">Add order tags here.</div>
            </div>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  </div>
  </>
};