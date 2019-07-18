import React from 'react';
import {Modal, ModalHeader, ModalBody,Row,Col, Input } from 'reactstrap';
import {Radioboxes,Input1Col,InputWithStyle,InputWithStyle2,InputWithRadio,Radiobox} from "./inputGroup.jsx";



class ShowTicketsCustomer extends React.Component {
  
  toggle=()=>{ this.props.toggleModal(false); }

  render()
  {
    const {searchArray,typeId}=this.props;
    const customerTypeId=(searchArray.customer!==null)?Object.assign({},searchArray.customer).typeId:"2";
    const customerName=(searchArray.customer!==null)?Object.assign({},searchArray.customer).name:"";
    const city=Object.assign({},searchArray.city);
    const contract=(typeId===1)?true:false;    
    const onceFlag=(searchArray.onceFlag!="1"?true:false);
    const test=(searchArray.customerPerson!==null);    
    const contractName=(searchArray.contract!==null)?Object.assign({},searchArray.contract).name:"";
    const sellerName=(searchArray.seller!==null)?Object.assign({},searchArray.seller).name:"";
    const sellerPersonName=(searchArray.sellerPerson!==null)?Object.assign({},searchArray.sellerPerson).name:"";  
    const vendorName=(searchArray.vendor!==null)?Object.assign({},searchArray.vendor).name:"";
    const equipment=(searchArray.equipment!==null)?Object.assign({},searchArray.equipment):{equipmentType:{model:"",name:""},serialNumber:"",location:"",regNumber:""};
    const equipmentTypeModel=Object.assign({},equipment.equipmentType).model;
    const equipmentTypeName=Object.assign({},equipment.equipmentType).name;
    const serialNumber=equipment.serialNumber;
    const location=equipment.location;
    const regNumber=equipment.regNumber;
    const cbsWarrantyFlag=(searchArray.cbsWarrantyFlag===1?true:false);
    const warrantyFlag=(searchArray.warrantyFlag===1?true:false);
    const endCBSWarrantyDate=(searchArray.equipment!==null)?Object.assign({},searchArray.equipment).endCBSWarrantyDate:"";
    const endWarrantyDate=(searchArray.equipment!==null)?Object.assign({},searchArray.equipment).endWarrantyDate:"";
    const serviceType=(searchArray.serviceType!==null)?Object.assign({},searchArray.serviceType).name:"";
    const repairPrice=(searchArray.repairPrice!==null)?searchArray.repairPrice:"";
    const diagPrice=(searchArray.diagPrice!==null)?searchArray.diagPrice:"";
    const paidFlag=(searchArray.paidFlag===1?true:false);
    const subcontractorFlag=(searchArray.subcontractorFlag===1?true:false);
  
    let customerPersonName="";
    let address="";
    let email="";
    let phone="";
   
    if (test)
    {
      const customer1=Object.assign({},searchArray.customerPerson);    
      customerPersonName=customer1.name;
      address=customer1.address;
      email=customer1.email;
      phone=customer1.phone;
    } else
    {
      const customer2=Object.assign({},searchArray.customerContact);    
      address=customer2.address;
      email=customer2.email;
      phone=customer2.phone;
    } 
    console.log("   ",this.props.searchArray,'  ',test,'  ',contract,'  ',typeId);
    return (       
      <Modal isOpen={this.props.modal} toggle={this.toggle} size="lg" id="showTicketsInfo">
        <ModalHeader  toggle={this.toggle}>
        { (typeId=="1" || typeId=="4") &&  
        <div className="modalHeader">
        <div>Заявка от заказчика</div>   
        <InputWithStyle title="№ заявки" value={searchArray.number} disable={false} px="220" pr="90"/>
        <InputWithStyle title="Дата подачи" value={searchArray.date} disable={false} px="210" pr="110"/>
        <InputWithStyle title="Город" value={city.name} disable={true} px="210" pr="70"/> 
        </div> }
        { (typeId=="2") &&  
        <div className="modalHeader">
        <div>Заявка на ремонт</div>
        <InputWithStyle title="№ заявки" value={searchArray.number} disable={false} px="220" pr="90"/>
        <InputWithStyle title="Дата поступления" value={searchArray.date} disable={false} px="250" pr="150"/>
        <InputWithStyle title="Дата приходной накладной" value={searchArray.invoiceDate} disable={false} px="310" pr="210"/> 
         </div> }
        { (typeId=="3") &&  
        <div className="modalHeader">
        <div>Заявка на запасные части</div>
        <InputWithStyle2 title="№ заявки и дата" value1={searchArray.number} 
        value2={searchArray.date} disable={false} px="140"/> 
        <InputWithStyle2 title="№ род.заявки и дата" value1={searchArray.number} 
        value2={searchArray.date} disable={false} px="170"/> 
        </div> }
        </ModalHeader>
      {/*****************************************************/} 
        { (typeId=="1" || typeId=="4" || typeId=="3") && <ModalBody className="modalBody1">
         <div className="customer">           
          <div className="fontBig">Заказчик</div>
          <div className="customerBox">
        <Radioboxes check={customerTypeId=="1"} value1="Организация" value2="Частное лицо"/>
        <Input1Col title="Наименование" value={customerName} disable={true}/>     
        <Radioboxes check={contract} value1="Договор" value2="Разовая заявка"/>
        { contract===false && <Input1Col title="Продавец" value={sellerName} disable={false}/>}
        { contract===false && <Input1Col title="Конт.лицо прод." value={sellerPersonName} disable={false}/>}
        { contract && <Input1Col title="№ договора" value={contractName} disable={true}/>}
        { contract && <Input1Col title="№ заявки по журналу заказчика" value={""} disable={false}/>}
        <Input1Col title="Конт.лицо заказчика" value={customerPersonName} disable={false}/>
        <Input1Col title="Адрес" value={address} disable={false}/>
        <Input1Col title="E-mail" value={email} disable={false}/>
        <Input1Col title="Телефоны" value={phone} disable={false}/>       
          </div>
          </div>
        {/*****************************************************/}      
          <div className="vendor">           
          <div className="fontBig">Оборудование</div>
          <div className="vendorBox">
          <Row>
          <Col sm="6"><Input1Col title="Производитель" value={vendorName} disable={true}/></Col>
          <Col sm="6"><Input1Col title="Тип модели" value={equipmentTypeModel} disable={false}/></Col>
          </Row>        
          <Row>
          <Col sm="6"><Input1Col title="Наименование" value={equipmentTypeName} disable={false}/></Col>
          <Col sm="6"><Input1Col title="Серийный №" value={serialNumber} disable={false}/></Col>
          </Row>          
          <Row>
          <Col sm="6"><Input1Col title="Регистрационный №" value={regNumber} disable={false}/></Col>
          <Col sm="6"><Input1Col title="Место установки" value={location} disable={false}/></Col>
          </Row>          
          </div>
          </div>
     {/*****************************************************/}   
     <div className="warrantyFlag">           
        <div className="fontBig">Гарантия</div>
        <div className="warrantyFlagBox">       
        <InputWithRadio checked={warrantyFlag} content={'Производителя до'} value={endWarrantyDate} disable={true}/>    
        <InputWithRadio checked={cbsWarrantyFlag}  content={'CBS до'} value={endCBSWarrantyDate} disable={true}/>
        </div>
     </div>     
     {/*****************************************************/}   
     <div className="serviceType">                    
        <div className="serviceTypeBox">   
        <Input1Col title="Вид услуг" value={serviceType} disable={true}/>     
        <Input className="fontMiddle" type="textarea" name="text" value={`Характер проблемы со слов заказчика =>${searchArray.description}`} />
        </div>
     </div>     
     {/*****************************************************/}   
     <div className="payCustomer">           
          <div className="fontBig">
          <Row>
        <Col sm="8"> 
           <div style={{display:"flex",alignItems:"center"}}>            
             <input type="checkbox" style={{height:"14px",width:"14px",marginLeft:"3px"}} checked={paidFlag}/>
            Оплачивается заказчиком
            </div>
          </Col>
         
        <Col sm="4">   
            <div style={{display:"flex",alignItems:"center"}}>            
             <input type="checkbox" style={{height:"14px",width:"14px"}} checked={subcontractorFlag}/>
            Субподрядчик
            </div>
          </Col> 
          </Row> 
            </div>
          <div className="payCustomerBox">   
          <Input1Col title="Стоимость ремонта с учетом НДС" value={repairPrice} disable={false}/>
          <Input1Col title="Стоимость диагностики с учетом НДС" value={diagPrice} disable={false}/>
          </div>
     </div>     
        </ModalBody > }
    {/*****************************************************/}

    {/*****************************************************/} 
    { (typeId=="2") && <ModalBody className="modalBody2">
         <div className="customer">           
          <div className="fontBig">Заказчик</div>
          <div className="customerBox">
        <Radioboxes check={customerTypeId=="1"} value1="Организация" value2="Частное лицо"/>
        <Input1Col title="Наименование" value={customerName} disable={true}/>  
        <Input1Col title="Город" value={city.name} disable={true}/>    
        <Radioboxes check={onceFlag} value1="Договор" value2="Разовая заявка"/>
        {onceFlag && <Input1Col title="№ договора" value={contractName} disable={true}/>}     
        {onceFlag===false && 
         <Row>
         <Col sm="6"><Input1Col title="№счета/акта" value={searchArray.billNumber} disable={false}/></Col>
         <Col sm="6"><Input1Col title="Дата счета/акта" value={searchArray.billDate} disable={false}/></Col>
         </Row> 
        }
        <Input1Col title="Контактное лицо" value={customerPersonName} disable={false}/>
        <Input1Col title="Адрес" value={address} disable={false}/>
        <Input1Col title="E-mail" value={email} disable={false}/>
        <Input1Col title="Телефоны" value={phone} disable={false}/>       
          </div>
          </div>
        {/*****************************************************/}      
          <div className="vendor">           
          <div className="fontBig">Блок/Устройство</div>
          <div className="vendorBox">
          <Input1Col title="Производитель оборудования" value={vendorName} disable={true}/>
          <Input1Col title="Наименование" value={searchArray.partName} disable={false}/>
          <Row>
          <Col sm="6"><Input1Col title="Серийный №" value={searchArray.serialNumber} disable={false}/></Col>
          <Col sm="6"><Input1Col title="Part number" value={searchArray.partNumber} disable={false}/></Col>
          </Row>        
          <Row>
          <Col sm="6"><Input1Col title="Идент.род.заявки" value={searchArray.blockNumber} disable={false}/></Col>
          <Col sm="6"><Radiobox check={cbsWarrantyFlag} value="Ремонт по гарантии CBS" disable={true}/></Col>
          </Row>    
                 
          </div>
          </div>
     {/*****************************************************/}   
     <div className="description">           
        <div className="fontBig">Описание</div>
        <div className="descriptionBox">       
        <Input className="fontMiddle" type="textarea" name="text" value={searchArray.description} />
        <Radiobox check={paidFlag} value="Оплачивается заказчиком" disable={true}/>
        </div>
     </div>     
    </ModalBody > }
    {/*****************************************************/}
        </Modal>
       
    );
  }
}

export default ShowTicketsCustomer;