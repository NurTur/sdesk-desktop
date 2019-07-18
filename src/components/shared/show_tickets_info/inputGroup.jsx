import React from 'react';
import {Row,Col} from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

export const Radioboxes=(props)=> {
    return (       
        <Row>
        <Col sm="6">  
        <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <Input className="fontMiddle" addon type="radio" checked={props.check}/>
          </InputGroupText>
        </InputGroupAddon>
        <Input  className="fontMiddle" value={props.value1} disabled/>
        </InputGroup>
        </Col>
        <Col sm="6">
        <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <Input className="fontMiddle" addon type="radio" checked={!props.check}/>
          </InputGroupText>
        </InputGroupAddon>
        <Input className="fontMiddle" value={props.value2} disabled/>
        </InputGroup>     
        </Col>   
        </Row>          
    );
  }

  export const Radiobox=(props)=> {
    return (       
        <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <Input className="fontMiddle" addon type="radio" checked={props.check}/>
          </InputGroupText>
        </InputGroupAddon>
        <Input className="fontMiddle" value={props.value} disabled/>
        </InputGroup>       
    );
  }

    export const Input1Col=(props)=> {
    return (       
      <InputGroup >
      <Input className="fontMiddle" addonType="prepend" value={props.title} disabled/>
      <Input className="fontMiddle" value={props.value} disabled={props.disable}/>
      </InputGroup>
    );
  }

  export const InputWithStyle=(props)=> {
    return (     
      <InputGroup  style={{maxWidth:`${props.px}px`}}>   
       <Input className="fontMiddle" style={{maxWidth:`${props.pr}px`}} 
        addonType="prepend" value={props.title} disabled/>
       <Input style={{maxWidth:`${parseInt(props.px)-parseInt(props.pr)}px`}} 
       className="fontMiddle" addonType="append" value={props.value} disabled={props.disable}/>
    </InputGroup>      
    );
  }

  export const InputWithStyle2=(props)=> {
    return (     
      <InputGroup  style={{width:`${parseInt(props.px)+230}px`}}>   
       <Input className="fontMiddle" style={{width:`${props.px}px`}} 
        addonType="prepend" value={props.title} disabled/>
       <Input className="fontMiddle" style={{width:`130px`}} 
        value={props.value1}/>
       <Input className="fontMiddle" style={{width:`100px`}} 
        addonType="prepend" value={props.value2}/>    
    </InputGroup>      
    );
  }

  export const InputWithRadio=(props)=> {
    return (       
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText className="fontMiddle">
            <Input addon type="radio" checked={props.check}/>&ensp;{props.content}
          </InputGroupText>          
        </InputGroupAddon>
        <Input className="fontMiddle" value={props.value} disabled={props.disable}/>
      </InputGroup>     
    );
  }