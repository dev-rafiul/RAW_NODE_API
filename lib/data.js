const fs = require('fs')
const path = require('path')


const lib = {};



lib.basedir = path.join(__dirname, '/../.data/')


// writing data to file

lib.create = (dir, file, data, callback) => {
    fs.open(lib.basedir+dir+'/'+file+'.json', 'wx', (err, fileDescriptor) => {
        if(!err && fileDescriptor){
            const stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor, stringData, (err2) => {
                if(!err2){
                    fs.close(fileDescriptor, (err3) => {
                        if(!err3){
                            callback(false)
                        }else{
                            callback("Error Closing the new file!")
                        }
                    })
                }else{
                    callback("error writing to new file")
                }
            })
        }else{
            callback('Could not create new File, it may already exists!')
        }
    })
}


// read data from file
lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf-8', (err, data) => {
        callback(err, data)
    })
}


lib.update = (dir, file, data, callback) => {
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if(!err && fileDescriptor){
            const stringData = JSON.stringify(data)

            fs.ftruncate(fileDescriptor, (err1) => {
                if(!err1){
                    fs.writeFile(fileDescriptor, stringData, (err2) => {
                        if(!err2){
                            fs.close(fileDescriptor, (err3) => {
                                if(!err3){
                                callback(false)
                                }else{
                                    
                                    callback("Error Closing file")
                                }
                            })
                        }else{
                            callback('Error writing to file!')
                        }
                    })
                }else{
                    callback('Error Truncating File')
                }
            })
        }else{
            console.log('Error Updating File may not exist')
        }
    })
}





module.exports = lib



