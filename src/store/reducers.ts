import { combineReducers } from '@reduxjs/toolkit';
const modulesFiles = require.context('./slices', true, /\.ts$/)
const modules = modulesFiles.keys().reduce((modules: { [x: string]: any; }, modulePath: string) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.ts$/, '$1')
  const value = modulesFiles(modulePath)
  const key = moduleName.replace(/\.slice$/, '')
  modules[key] = value.default
  return modules
}, {})
const reducer = combineReducers(modules)
export default reducer
