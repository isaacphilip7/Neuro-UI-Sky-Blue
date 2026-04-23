import React from "react";
import { Box } from "@mui/material";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";

export function AgentDesigner() {
  // Explicit types fix TS errors
  const initialNodes: Node[] = [
    {
      id: "designer",
      position: { x: 250, y: 100 },
      data: { label: "agent_network_designer" },
      style: {
        padding: 12,
        borderRadius: 12,
        background: "#1e1f25",
        color: "white",
        border: "1px solid #4f8cff",
      },
      type: "default",
    },
  ];

  const initialEdges: Edge[] = [];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Correct type for onConnect
  const onConnect = React.useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <Box sx={{ flex: 1, minHeight: 0 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </Box>
  );
}
