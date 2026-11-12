const renderErrorHandler= (err, res) =>{
    
        return res.status(500).json({
            message:err.message || "somthing went wrong!"
            
        });

    
}

module.exports =renderErrorHandler;