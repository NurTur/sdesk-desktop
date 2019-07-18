import { UPDATE_COLUMN,SET_LOADING,SET_ERROR,GET_TICKET_ID } from "../actions/actionTypes";

const InitalState ={ columns:

[{id:1, value:"Тип заявки",status:true, constant:true},
{id:2, value:"Номер заявки",status:true, constant:true}, 
{id:3, value:"Вид работ",status:true,constant:true},
{id:4, value:"Дата подачи",status:true,constant:true},
{id:5, value:"Гарантия",status:false,constant:false},
{id:6, value:"Гарантия CBS",status:false,constant:false},
{id:7, value:"Гарантия до",status:false,constant:false},
{id:8, value:"Гарантия CBS до",status:false,constant:false},
{id:9, value:"№ заказа",status:false,constant:false},
{id:10, value:"Заказчик",status:true,constant:true},
{id:11, value:"Статус",status:true,constant:true},
{id:12, value:"Срок ожидания до",status:false,constant:false},
{id:13, value:"Исполнитель",status:true,constant:true},
{id:14, value:"Оборудование.TM",status:false,constant:false},
{id:15, value:"Оборудование.SN",status:false,constant:false},
{id:16, value:"Рег.номер",status:true,constant:true},
{id:17, value:"Город",status:false,constant:false},
{id:18, value:"Субподрядчик",status:false,constant:false},
{id:19, value:"Причины неисправности",status:false,constant:false}],
request:  {loading: false, error: false} }

function Global(state = InitalState, action) {
    switch (action.type) {
        case UPDATE_COLUMN: return Object.assign({},state,{columns:action.payload}); 
        case SET_LOADING: return Object.assign({},state,{request:{ loading:action.payload, error:false}});
        case SET_ERROR: return Object.assign({},state,{request:{ loading: false, error: true }});
        default: return state;
    }
};

export default Global;



