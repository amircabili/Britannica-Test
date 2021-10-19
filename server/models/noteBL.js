const noteModel = require('./noteModel');

const getNotes = function(nameVal)
{
    return new Promise((resolve, reject) =>
    {
        if(nameVal == undefined)
        {
            noteModel.find({}, function(err, data)
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve(data)
                }
            })
        }
        else
        {
            noteModel.find({"name" : nameVal }, function(err, data)
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve(data)
                }
            })

        }

    })
}


const getNote = function(id)
{
    return new Promise((resolve, reject) =>
    {
        noteModel.findById(id, function(err, data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data)
            }
        })
    })
}

const createNote = function(obj)
{
    return new Promise((resolve, reject) =>
    {
        let user = new noteModel({
            authorname : obj.authorname,
            content : obj.content,
            date : obj.date
        });

        user.save(function(err)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve('Created !')
            }
        })
    })
}


const updateNote = function(id,obj)
{
    return new Promise((resolve, reject) =>
    {

        noteModel.findByIdAndUpdate(id,
            {
                authorname : obj.authorname,
                content : obj.content,
                date : obj.date
            },function(err)
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve('Updated !')
                }
            })

    })
}


const deleteNote = function(id)
{
    return new Promise((resolve, reject) =>
    {
        noteModel.findByIdAndDelete(id,function(err)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve('Deleted !')
            }
        })

    })
}

module.exports = {getNotes, getNote, createNote, updateNote, deleteNote}