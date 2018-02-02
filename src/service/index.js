import api from './api'
import request from './request'

export const getInfo = () => request(api.getInfo).then(res => res.data)

export const getAllNumber = () => request(api.getAllNumber).then(res => res.data)

export const getCerSeletOptions = () => request(api.getDictionary, {
  code: 'cert_qualification,ep_leader,credentials'
}).then(res => res.data)

export const getCertProtocol = () => request(api.getStaticPage, {
  title: 'cert_protocol'
}, 'GET', 'text').then(res => res)

export const getCertExplain = () => request(api.getStaticPage, {
  title: 'other_qualification_explain'
}, 'GET', 'text').then(res => res)
