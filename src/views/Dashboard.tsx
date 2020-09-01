import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const Dashboard = () => {
	return (
		<Box m={2}>
			<Button
				fullWidth={true}
        startIcon={<AddIcon />}
      >
        Add wishlist
      </Button>
		</Box>
	)
}

export default Dashboard
