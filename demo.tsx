import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
const myWorker = new Worker('worker.ts');

export default function ControlledTreeView() {
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [tree, setTree] = React.useState(null);

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setSelected(nodeIds);
  };

  const handleExpandClick = () => {
    setExpanded((oldExpanded) =>
      oldExpanded.length === 0 ? ['1', '5', '6', '7'] : []
    );
  };

  const handleSelectClick = () => {
    setSelected((oldSelected) =>
      oldSelected.length === 0
        ? ['1', '2', '3', '4', '5', '6', '7', '8', '9']
        : []
    );
  };

  myWorker.onmessage = function (e) {
    console.log('Message received from worker:', e.data);
    setTree(e.data);
  };

  console.log(tree);

  // React.useEffect(() => {
  //   setTree(() => [...Array(n)].map((e, i) => (
  //     <React.Fragment key={i}>
  //       <TreeItem nodeId="1" label="Applications">
  //         <TreeItem nodeId="2" label="Calendar" />
  //         <TreeItem nodeId="3" label="Chrome" />
  //         <TreeItem nodeId="4" label="Webstorm" />
  //       </TreeItem>
  //       <TreeItem nodeId="5" label="Documents">
  //         <TreeItem nodeId="6" label="MUI">
  //           <TreeItem nodeId="7" label="src">
  //             <TreeItem nodeId="8" label="index.js" />
  //             <TreeItem nodeId="9" label="tree-view.js" />
  //           </TreeItem>
  //         </TreeItem>
  //       </TreeItem>
  //     </React.Fragment>
  //   )));
  // }, [])

  // tree = React.useMemo(() => {
  //   console.log('one');
  //   return [...Array(n)].map((e, i) => (
  //     <React.Fragment key={i}>
  //       <TreeItem nodeId="1" label="Applications">
  //         <TreeItem nodeId="2" label="Calendar" />
  //         <TreeItem nodeId="3" label="Chrome" />
  //         <TreeItem nodeId="4" label="Webstorm" />
  //       </TreeItem>
  //       <TreeItem nodeId="5" label="Documents">
  //         <TreeItem nodeId="6" label="MUI">
  //           <TreeItem nodeId="7" label="src">
  //             <TreeItem nodeId="8" label="index.js" />
  //             <TreeItem nodeId="9" label="tree-view.js" />
  //           </TreeItem>
  //         </TreeItem>
  //       </TreeItem>
  //     </React.Fragment>
  //   ));
  // }, []);

  return (
    <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
      <Box sx={{ mb: 1 }}>
        <Button onClick={handleExpandClick}>
          {expanded.length === 0 ? 'Expand all' : 'Collapse all'}
        </Button>
        <Button onClick={handleSelectClick}>
          {selected.length === 0 ? 'Select all' : 'Unselect all'}
        </Button>
      </Box>
      <TreeView
        aria-label="controlled"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
        multiSelect
      >
        {tree || <div>Loading...</div>}
      </TreeView>
    </Box>
  );
}
