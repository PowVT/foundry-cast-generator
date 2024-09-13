import React, { useState, useEffect } from 'react';
import { Save, Copy, Trash2 } from 'lucide-react';
import { Input, Textarea } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
const FoundryCastCommandGenerator = () => {
  const [formData, setFormData] = useState({
    rpcUrl: '',
    privateKey: '',
    gasLimit: '',
    value: '',
    contractAddress: '',
    signature: '',
    args: '',
    chainId: '',
    // Add more fields for other Foundry flags
  });
  
  const [command, setCommand] = useState('');
  const [snapshots, setSnapshots] = useState([]);
  
  useEffect(() => {
    generateCommand();
  }, [formData]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const generateCommand = () => {
    let cmd = 'cast send';
    if (formData.rpcUrl) cmd += ` --rpc-url ${formData.rpcUrl}`;
    if (formData.privateKey) cmd += ` --private-key ${formData.privateKey}`;
    if (formData.gasLimit) cmd += ` --gas-limit ${formData.gasLimit}`;
    if (formData.value) cmd += ` --value ${formData.value}`;
    if (formData.chainId) cmd += ` --chain-id ${formData.chainId}`;
    if (formData.contractAddress) cmd += ` ${formData.contractAddress}`;
    if (formData.signature) cmd += ` "${formData.signature}"`;
    if (formData.args) cmd += ` ${formData.args}`;
    // Add more flags as needed
    setCommand(cmd);
  };
  
  const saveSnapshot = () => {
    setSnapshots(prevSnapshots => [...prevSnapshots, { command, formData }]);
  };
  
  const loadSnapshot = (index) => {
    const snapshot = snapshots[index];
    setFormData(snapshot.formData);
    setCommand(snapshot.command);
  };
  
  const deleteSnapshot = (index) => {
    setSnapshots(prevSnapshots => prevSnapshots.filter((_, i) => i !== index));
  };
  
  const copyCommand = () => {
    navigator.clipboard.writeText(command);
  };
  
  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-4 overflow-y-auto">
        <Card>
          <CardHeader>
            <CardTitle>Foundry Cast Command Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="rpcUrl">RPC URL</Label>
                <Input
                  id="rpcUrl"
                  name="rpcUrl"
                  value={formData.rpcUrl}
                  onChange={handleInputChange}
                  placeholder="https://mainnet.infura.io/v3/YOUR-PROJECT-ID"
                />
              </div>
              <div>
                <Label htmlFor="privateKey">Private Key</Label>
                <Input
                  id="privateKey"
                  name="privateKey"
                  value={formData.privateKey}
                  onChange={handleInputChange}
                  placeholder="0x..."
                  type="password"
                />
              </div>
              <div>
                <Label htmlFor="gasLimit">Gas Limit</Label>
                <Input
                  id="gasLimit"
                  name="gasLimit"
                  value={formData.gasLimit}
                  onChange={handleInputChange}
                  placeholder="21000"
                />
              </div>
              <div>
                <Label htmlFor="value">Value (in wei)</Label>
                <Input
                  id="value"
                  name="value"
                  value={formData.value}
                  onChange={handleInputChange}
                  placeholder="1000000000000000000"
                />
              </div>
              <div>
                <Label htmlFor="contractAddress">Contract Address</Label>
                <Input
                  id="contractAddress"
                  name="contractAddress"
                  value={formData.contractAddress}
                  onChange={handleInputChange}
                  placeholder="0x..."
                />
              </div>
              <div>
                <Label htmlFor="signature">Function Signature</Label>
                <Input
                  id="signature"
                  name="signature"
                  value={formData.signature}
                  onChange={handleInputChange}
                  placeholder="transfer(address,uint256)"
                />
              </div>
              <div>
                <Label htmlFor="args">Arguments</Label>
                <Input
                  id="args"
                  name="args"
                  value={formData.args}
                  onChange={handleInputChange}
                  placeholder="0x... 1000000000000000000"
                />
              </div>
              <div>
                <Label htmlFor="chainId">Chain ID</Label>
                <Input
                  id="chainId"
                  name="chainId"
                  value={formData.chainId}
                  onChange={handleInputChange}
                  placeholder="120893"
                />
              </div>
              {/* Add more input fields for other Foundry flags */}
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="w-1/2 p-4 overflow-y-auto">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Generated Command</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={command} readOnly className="h-32" />
            <Button onClick={copyCommand} className="mt-2">
              <Copy className="mr-2 h-4 w-4" /> Copy Command
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Snapshots</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={saveSnapshot} className="mb-2">
              <Save className="mr-2 h-4 w-4" /> Save Current Snapshot
            </Button>
            <div className="space-y-2">
              {snapshots.map((snapshot, index) => (
                <div key={index} className="flex items-center justify-between">
                  <Button onClick={() => loadSnapshot(index)} variant="outline">
                    Load Snapshot {index + 1}
                  </Button>
                  <Button onClick={() => deleteSnapshot(index)} variant="ghost">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FoundryCastCommandGenerator;