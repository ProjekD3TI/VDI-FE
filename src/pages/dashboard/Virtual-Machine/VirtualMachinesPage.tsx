import TemplateVMTable from "./components/TemplateVMTable";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VirtualDesktopTable from "./components/VirtualDesktopTable";

const VirtualMachinesPage = () => {
  return (
    <Tabs defaultValue="desktop">
      <TabsList>
        <TabsTrigger value="desktop">Desktop</TabsTrigger>
        <TabsTrigger value="analytics">Template</TabsTrigger>
      </TabsList>
      <TabsContent value="desktop">
        <Card>
          <VirtualDesktopTable />
        </Card>
      </TabsContent>
      <TabsContent value="analytics">
        <Card>
          <TemplateVMTable />
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default VirtualMachinesPage;
